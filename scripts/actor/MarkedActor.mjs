// scripts/actor/MarkedActor.mjs

export class MarkedActor extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();

    // System data shortcut
    const system = this.system;

    // Ensure details exists
    if (!system.details) system.details = {};
    const details = system.details;

    // ==================================
    // SPIRIT ECONOMY
    // Total Spirit = Current + Spent
    // ==================================
    const current = Number(details.currentSpirit ?? 0) || 0;
    const spent   = Number(details.spentSpirit ?? 0) || 0;

    // Derived field: how much Spirit has ever been awarded
    details.totalSpirit = current + spent;

    // =============================
    // ATTRIBUTE GROUP AVERAGES
    // =============================
    const attrs = system.attributes ?? {};

    // Body = average of (Might, Swiftness, Endurance)
    if (attrs.body) {
      const b = attrs.body;
      const values = [
        b.might?.value,
        b.swiftness?.value,
        b.endurance?.value
      ].map(v => Number(v ?? 0));

      const sum   = values.reduce((a, v) => a + v, 0);
      const count = values.length || 1;
      b.value = Math.round(sum / count);
    }

    // Mind = average of (Insight, Quickness, Willpower)
    if (attrs.mind) {
      const m = attrs.mind;
      const values = [
        m.insight?.value,
        m.quickness?.value,
        m.willpower?.value
      ].map(v => Number(v ?? 0));

      const sum   = values.reduce((a, v) => a + v, 0);
      const count = values.length || 1;
      m.value = Math.round(sum / count);
    }

    // Soul = average of (Presence, Grace, Resolve)
    if (attrs.soul) {
      const s = attrs.soul;
      const values = [
        s.presence?.value,
        s.grace?.value,
        s.resolve?.value
      ].map(v => Number(v ?? 0));

      const sum   = values.reduce((a, v) => a + v, 0);
      const count = values.length || 1;
      s.value = Math.round(sum / count);
    }

    // =============================
    // SKILL TOTALS
    // (for now: total = parent sub-attribute value)
    // =============================
    const skills = system.skills ?? {};

    const setSkillTotals = (groupSkills, attrValue) => {
      if (!groupSkills) return;
      const base = Number(attrValue ?? 0) || 0;

      for (const [key, skillData] of Object.entries(groupSkills)) {
        if (key === "expertise") continue; // skip flag
        if (!skillData || typeof skillData !== "object") continue;

        // Skill node should have a 'total' field
        skillData.total = base;
      }
    };

    // BODY → Might / Swiftness / Endurance
    if (skills.body && attrs.body) {
      setSkillTotals(skills.body.might,     attrs.body.might?.value);
      setSkillTotals(skills.body.swiftness, attrs.body.swiftness?.value);
      setSkillTotals(skills.body.endurance, attrs.body.endurance?.value);
    }

    // MIND → Insight / Quickness / Willpower
    if (skills.mind && attrs.mind) {
      setSkillTotals(skills.mind.insight,   attrs.mind.insight?.value);
      setSkillTotals(skills.mind.quickness, attrs.mind.quickness?.value);
      setSkillTotals(skills.mind.willpower, attrs.mind.willpower?.value);
    }

    // SOUL → Presence / Grace / Resolve
    if (skills.soul && attrs.soul) {
      setSkillTotals(skills.soul.presence, attrs.soul.presence?.value);
      setSkillTotals(skills.soul.grace,    attrs.soul.grace?.value);
      setSkillTotals(skills.soul.resolve,  attrs.soul.resolve?.value);
    }

    // Later: compute Defense, Trauma effects, Essence slots, Mark effects, etc.
  }

  // ============================================================
  // CORE ROLL LOGIC: d100 vs target with successes
  //  - Roll 1d100
  //  - Auto fail on 95–100
  //  - Success if roll <= target
  //  - +1 extra success per full 15 under target
  //  - Rolls 1–5: critical success, +4 successes
  // ============================================================
  async _rollPercentTest(target, {
    label       = "Test",
    flavor      = "",
    data        = {},
    chatOptions = {}
  } = {}) {

    const tn = Number(target ?? 0) || 0;

    // If for some reason target is 0 or negative, just warn
    if (tn <= 0) {
      ui?.notifications?.warn?.("Target number is 0 or less – automatic failure.");
    }

    const roll = await (new Roll("1d100")).evaluate({ async: true });
    const value = roll.total;

    const isCrit     = (value >= 1 && value <= 5);
    const isAutoFail = (value >= 95 && value <= 100);

    let successes = 0;
    let resultText = "Failure";

    if (!isAutoFail && tn > 0 && value <= tn) {
      // Base 1 success
      successes = 1;

      // Margin under target
      const margin = tn - value;

      // +1 per full 15 under
      successes += Math.floor(margin / 15);

      // Crit adds +4 successes
      if (isCrit) successes += 4;

      if (isCrit) {
        resultText = "Critical Success";
      } else if (successes > 1) {
        resultText = "Success (Multiple)";
      } else {
        resultText = "Success";
      }
    } else {
      // Failure path (includes auto fail)
      if (isAutoFail) {
        resultText = "Automatic Failure";
      } else {
        resultText = "Failure";
      }
    }

    // ----- Build a simple roll card -----
    const rollHTML = await roll.render();

    const content = `
      <div class="marked-roll-card">
        <header class="roll-header">
          <h3>${label}</h3>
        </header>
        <div class="roll-body">
          <p><strong>Target:</strong> ${tn}%</p>
          <p><strong>Roll:</strong> ${value}</p>
          <p><strong>Successes:</strong> ${successes}</p>
          <p><strong>Result:</strong> ${resultText}</p>
        </div>
        <hr/>
        <div class="roll-result">
          ${rollHTML}
        </div>
      </div>
    `;

    const speaker = ChatMessage.getSpeaker({ actor: this });

    await ChatMessage.create({
      speaker,
      flavor,
      content,
      type: CONST.CHAT_MESSAGE_TYPES.ROLL,
      rolls: [roll],
      flags: {
        "tales-of-mezoria-system": {
          testType: data.testType ?? "attribute",
          target: tn,
          rawRoll: value,
          successes
        }
      },
      ...chatOptions
    });

    return {
      roll,
      target: tn,
      value,
      successes,
      isCrit,
      isAutoFail,
      resultText
    };
  }

  // ============================================================
  // ATTRIBUTE GROUP ROLL
  //  - attrKey: "body" | "mind" | "soul"
  //  - Uses the AVG value (system.attributes[attrKey].value)
  // ============================================================
  async rollAttributeGroup(attrKey) {
    const attrs = this.system.attributes ?? {};
    const group = attrs[attrKey];
    if (!group) return;

    const tn = Number(group.value ?? 0) || 0;
    const label = `${this.name} – ${group.label} Test`;

    return this._rollPercentTest(tn, {
      label,
      flavor: `Attribute roll: ${group.label}`,
      data: { testType: "attribute", attrKey }
    });
  }

  // ============================================================
  // SKILL ROLL (for later wiring to skill buttons)
  //  - path example: "body.might.athletics"
  //    → looks up system.skills.body.might.athletics.total
  // ============================================================
  async rollSkill(path, { label = null, flavor = "" } = {}) {
    const skills = this.system.skills ?? {};
    if (!path) return;

    const segments = path.split(".");
    let node = skills;

    for (const seg of segments) {
      if (!node) break;
      node = node[seg];
    }

    if (!node) {
      console.warn(`MarkedActor | rollSkill: could not resolve path ${path}`);
      return;
    }

    const tn = Number(node.total ?? 0) || 0;
    const skillLabel = label || node.label || path;

    return this._rollPercentTest(tn, {
      label: `${this.name} – ${skillLabel}`,
      flavor: `Skill roll: ${skillLabel}`,
      data: { testType: "skill", path }
    });
  }
}
