// system.mjs

import { MarkedConfig } from "./scripts/config.mjs";
import { MarkedActor } from "./scripts/actor/MarkedActor.mjs";
import { MarkedActorSheet } from "./scripts/actor/MarkedActorSheet.mjs";
import { MarkedItem } from "./scripts/item/MarkedItem.mjs";
import { MarkedItemSheet } from "./scripts/item/MarkedItemSheet.mjs";

Hooks.once("init", function () {
  console.log("Tales of Mezoria System | Initializing");

  // Expose config namespace on the global game object
  game.talesOfMezoria = {
    config: MarkedConfig
  };

  // Register custom document classes
  CONFIG.Actor.documentClass = MarkedActor;
  CONFIG.Item.documentClass = MarkedItem;

  // Unregister core sheets
  Actors.unregisterSheet("core", ActorSheet);
  Items.unregisterSheet("core", ItemSheet);

  // Register our actor sheet (pc + npc for now)
  Actors.registerSheet("tales-of-mezoria-system", MarkedActorSheet, {
    types: ["pc", "npc"],
    makeDefault: true
  });

  // Register our item sheet
  Items.registerSheet("tales-of-mezoria-system", MarkedItemSheet, {
    makeDefault: true
  });
});

// ----------------------------------------------
// PRELOAD HANDLEBARS PARTIALS
// ----------------------------------------------
Hooks.once("setup", async function () {
  console.log("Tales of Mezoria System | Preloading templates");

  await loadTemplates([
    "systems/tales-of-mezoria-system/templates/actors/parts/header.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/attributes.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/status.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/tabs.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/abilities.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/subparts/backtype.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/subparts/rankdrop.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/subparts/racedrop.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/subparts/tribedrop.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/subparts/clandrop.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/subparts/backdrop.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/subparts/mopdrop.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/information.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/skills.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/skills/body-might.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/skills/body-swiftness.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/skills/body-endurance.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/skills/mind-insight.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/skills/mind-quickness.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/skills/mind-willpower.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/skills/soul-presence.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/skills/soul-grace.hbs",
    "systems/tales-of-mezoria-system/templates/actors/parts/skills/soul-resolve.hbs"
  ]);
});
