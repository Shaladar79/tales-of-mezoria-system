// scripts/actor/MarkedActorSheet.mjs

import { MarkedConfig } from "../config.mjs";

export class MarkedActorSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["marked", "sheet", "actor"],
      template: "systems/tales-of-mezoria-system/templates/actors/actor-sheet.hbs",
      width: 900,
      height: 700,

      tabs: [
        // TOP-LEVEL TABS (Information / Attributes & Status / Abilities / Skills)
        {
          navSelector: ".sheet-tabs",
          contentSelector: ".sheet-body",
          initial: "attr-status"
        },

        // SUBTABS: Attributes & Status
        {
          navSelector: ".sub-tabs",
          contentSelector: ".sub-body",
          initial: "attributes"
        },

        // SUBTABS: Abilities (Marks, later more)
        {
          navSelector: ".abilities-subtabs",
          contentSelector: ".abilities-subbody",
          initial: "marks"
        },

        // SUBTABS: Skills (Body / Mind / Soul)
        {
          navSelector: ".skills-sub-tabs",
          contentSelector: ".skills-sub-body",
          initial: "body-skills"
        }
      ],

      submitOnChange: true,
      submitOnClose: true
    });
  }

  getData(options = {}) {
    const data = super.getData(options);

    // Foundry v10/11 compatibility: some versions use data.data.system
    data.system = data.data?.system ?? data.system;
    data.config = MarkedConfig;

    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // --------------------------------
    // RACE-DEPENDENT EXTRA DROPDOWNS
    // --------------------------------
    const raceSelect = html.find('select[name="system.details.race"]');
    const tribeField = html.find(".tribe-field");
    const clanField  = html.find(".clan-field");

    // Show/hide tribe & clan based on race key ("mythrian", "draconian")
    const updateRaceDependentFields = () => {
      const raceKey = raceSelect.val();

      // Mythrian → show Tribe
      if (raceKey === "mythrian") {
        tribeField.show();
      } else {
        tribeField.hide();
        this.object.update({ "system.details.tribe": "" });
      }

      // Draconian → show Clan
      if (raceKey === "draconian") {
        clanField.show();
      } else {
        clanField.hide();
        this.object.update({ "system.details.clan": "" });
      }
    };

    // Apply racial STATUS + ATTRIBUTE bonuses when race changes
    const applyRaceData = () => {
      const raceKey = raceSelect.val();
      if (!raceKey) return;

      // Use raceKey directly to match config (human, etherean, etc.)
      const raceStatus     = MarkedConfig.raceStatus?.[raceKey];
      const raceAttributes = MarkedConfig.raceAttributes?.[raceKey];

      const update = {};

      // 1) STATUS: copy racial status into system.status.*
      if (raceStatus?.status) {
        for (const [path, value] of Object.entries(raceStatus.status)) {
          // path like "vitality.max" → "system.status.vitality.max"
          update[`system.status.${path}`] = value;
        }

        // Optionally set current = max for V/M/S
        if (raceStatus.status["vitality.max"] !== undefined) {
          update["system.status.vitality.value"] = raceStatus.status["vitality.max"];
        }
        if (raceStatus.status["mana.max"] !== undefined) {
          update["system.status.mana.value"] = raceStatus.status["mana.max"];
        }
        if (raceStatus.status["stamina.max"] !== undefined) {
          update["system.status.stamina.value"] = raceStatus.status["stamina.max"];
        }
      }

      // 2) ATTRIBUTES: apply racial modifiers to sub-attributes
      if (raceAttributes) {
        for (const [path, bonus] of Object.entries(raceAttributes)) {
          // path like "body.might" → system.attributes.body.might.value
          const attrPath = `system.attributes.${path}.value`;
          const current  = foundry.utils.getProperty(this.actor.system, attrPath) ?? 0;
          update[attrPath] = Number(current) + Number(bonus);
        }
      }

      // Make sure race key is stored on the actor
      update["system.details.race"] = raceKey;

      if (Object.keys(update).length > 0) {
        this.object.update(update);
      }
    };

    // Initial state
    updateRaceDependentFields();

    // When race changes
    raceSelect.on("change", () => {
      updateRaceDependentFields();
      applyRaceData();
    });

    // --------------------------------
    // ROLL HANDLERS
    // --------------------------------

    // Attribute rolls (Body/Mind/Soul avg)
    html.on("click", ".roll-attribute", (event) => this._onAttributeRoll(event));

    // Sub-attribute rolls (Might, Swiftness, etc.)
    html.on("click", ".roll-subattribute", (event) => this._onSubAttributeRoll(event));

    // Skill rolls
    html.on("click", ".roll-skill", (event) => this._onSkillRoll(event));
  }

  // ============================
  // ROLL HELPERS
  // ============================

  /**
   * Generic roll evaluator: 1d100 vs TN
   * - 95–100 = automatic failure
   * - 1–5 = critical success (+4 successes)
   * - Success if roll <= TN
   * - +1 success per full 15 points under TN
   */
  async _evaluateRoll(tn) {
    const roll = await (new Roll("1d100")).evaluate({ async: true });
    const total = roll.total;

    let successes = 0;
    let isCrit = false;
    let isFailure = false;

    // Auto-fail band
    if (total >= 95) {
      isFailure = true;
      successes = 0;
    } else {
      // Base success check
      if (total <= tn) {
        successes = 1 + Math.floor((tn - total) / 15);
      } else {
        successes = 0;
        isFailure = true;
      }

      // Critical band (1–5 always crit, adds +4 successes)
      if (total >= 1 && total <= 5) {
        isCrit = true;
        successes += 4;
      }

      // Guard: no negative successes
      if (successes < 0) successes = 0;
    }

    // Store lastDOS on the actor as a flag (and optionally in system if you want later)
    await this.actor.setFlag("tales-of-mezoria-system", "lastDOS", successes);

    return { roll, total, tn, successes, isCrit, isFailure };
  }

  /**
   * Render and post chat card
   */
  async _postRollCard({ title, tn, total, successes, isCrit, isFailure, tags = [], roll }) {
    const template = "systems/tales-of-mezoria-system/templates/chat/roll-card.hbs";

    const data = {
      title,
      tn,
      total,
      successes,
      isCrit,
      isFailure,
      tags
    };

    const content = await renderTemplate(template, data);

    return ChatMessage.create({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      type: CONST.CHAT_MESSAGE_TYPES.ROLL,
      roll,
      content
    });
  }

  // ============================
  // ATTRIBUTE ROLLS
  // ============================

  /**
   * Roll Body/Mind/Soul using the AVG value as TN
   */
  async _onAttributeRoll(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const attrKey = button.dataset.attr; // "body", "mind", "soul"

    const system = this.actor.system;
    const attrGroup = system.attributes?.[attrKey];
    if (!attrGroup) return;

    const tn = Number(attrGroup.value ?? 0) || 0;
    const label = attrGroup.label || attrKey;

    const { roll, total, successes, isCrit, isFailure } = await this._evaluateRoll(tn);

    await this._postRollCard({
      title: `${label} Check`,
      tn,
      total,
      successes,
      isCrit,
      isFailure,
      tags: [], // no trained/exp tags on raw attribute
      roll
    });
  }

  /**
   * Roll a sub-attribute (Might, Swiftness, etc.) using its value as TN
   * Expected data-subattr on the button: "body.might", "mind.insight", etc.
   */
  async _onSubAttributeRoll(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const subAttrPath = button.dataset.subattr;   // e.g. "body.might"
    if (!subAttrPath) return;

    const [groupKey, subKey] = subAttrPath.split(".");
    const system = this.actor.system;
    const group = system.attributes?.[groupKey];
    if (!group) return;

    const subAttr = group[subKey];
    if (!subAttr) return;

    const tn = Number(subAttr.value ?? 0) || 0;
    const label = `${subAttr.label || subKey} (${group.label || groupKey})`;

    const { roll, total, successes, isCrit, isFailure } = await this._evaluateRoll(tn);

    await this._postRollCard({
      title: `${label} Check`,
      tn,
      total,
      successes,
      isCrit,
      isFailure,
      tags: [], // still just a raw sub-attribute
      roll
    });
  }

  // ============================
  // SKILL ROLLS
  // ============================

  /**
   * Skill roll:
   * - TN starts from sub-attribute value
   * - If trained: +5, tag "Trained"
   * - If untrained: -10, tag "Untrained"
   * - If sub-attribute expertise: +3, tag "Expertise"
   * - Prompt for Specialty: if yes, +3, tag "Specialty"
   *
   * Expected data-skill: "body.might.athletics", "mind.insight.lore", etc.
   */
  async _onSkillRoll(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const skillPath = button.dataset.skill; // e.g. "body.might.athletics"

    if (!skillPath) return;

    const [attrGroupKey, subAttrKey, skillKey] = skillPath.split(".");
    const system = this.actor.system;

    const attrs = system.attributes?.[attrGroupKey];
    if (!attrs) return;

    const subAttr = attrs[subAttrKey];
    if (!subAttr) return;

    const skillsRoot = system.skills?.[attrGroupKey]?.[subAttrKey];
    if (!skillsRoot) return;

    const skillData = skillsRoot[skillKey];
    if (!skillData) return;

    let tn = Number(subAttr.value ?? 0) || 0;
    const tags = [];

    // Trained vs Untrained
    const trained = !!skillData.trained;
    if (trained) {
      tn += 5;
      tags.push("Trained");
    } else {
      tn -= 10;
      tags.push("Untrained");
    }

    // Expertise from the sub-attribute skill group
    const expertise = !!skillsRoot.expertise;
    if (expertise) {
      tn += 3;
      tags.push("Expertise");
    }

    // Temporary prompt for Specialty use
    let useSpecialty = false;
    await Dialog.prompt({
      title: "Specialty Roll?",
      content: `<p>Is this a <strong>Specialty</strong> use of ${skillData.label}?</p>`,
      label: "Yes",
      callback: (html) => {
        // If they accept the dialog, treat as "Yes"
        useSpecialty = true;
      },
      rejectClose: true
    }).catch(() => { /* cancelled */ });

    if (useSpecialty) {
      tn += 3;
      tags.push("Specialty");
    }

    const title = `${skillData.label} (${subAttr.label || subAttrKey})`;

    const { roll, total, successes, isCrit, isFailure } = await this._evaluateRoll(tn);

    await this._postRollCard({
      title,
      tn,
      total,
      successes,
      isCrit,
      isFailure,
      tags,
      roll
    });
  }
}
