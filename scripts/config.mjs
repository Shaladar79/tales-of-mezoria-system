// scripts/config.mjs
import { MarkedRaceDescriptions } from "./data/races.mjs";

export const MarkedConfig = {};

// Make race info available on config
MarkedConfig.raceData = MarkedRaceDescriptions;
// Alias used by information.hbs
MarkedConfig.raceDescriptions = MarkedRaceDescriptions;

// -------------------------------------
// ATTRIBUTE CATEGORIES
// -------------------------------------
MarkedConfig.attributes = {
  body: { label: "Body" },
  mind: { label: "Mind" },
  soul: { label: "Soul" }
};

// -------------------------------------
// SIMPLE RANK MAP (key → label)
// -------------------------------------
MarkedConfig.ranks = {
  normal:    "Normal",
  quartz:    "Quartz",
  topaz:     "Topaz",
  garnet:    "Garnet",
  emerald:   "Emerald",
  sapphire:  "Sapphire",
  ruby:      "Ruby",
  diamond:   "Diamond",
  mythrite:  "Mythrite",
  celestite: "Celestite"
};

// -------------------------------------
// RACES (simple key → label)
// -------------------------------------
MarkedConfig.races = {
  human:      "Human",
  etherean:   "Etherean",
  mythrian:   "Mythrian",
  anthozoan:  "Anthozoan",
  sylvan:     "Sylvan",
  sprite:     "Sprite",
  auramine:   "Auramine",
  draconian:  "Draconian",
  embergiest: "Embergiest",
  earthen:    "Earthen",
  prismatic:  "Prismatic"
};

// -------------------------------------
// MYTHRIAN TRIBES
// -------------------------------------
MarkedConfig.mythrianTribes = {
  lion: "Lion Tribe",
  wolf: "Wolf Tribe",
  bear: "Bear Tribe"
};

// -------------------------------------
// DRACONIAN CLANS
// -------------------------------------
MarkedConfig.draconianClans = {
  flame: "Flame Clan",
  storm: "Storm Clan",
  stone: "Stone Clan"
};

// -------------------------------------
// BACKGROUND TYPES
// -------------------------------------
MarkedConfig.backgroundTypes = {
  common:  "Common Professions",
  skilled: "Skilled Trades & Crafts",
  street:  "Street-Level Backgrounds",
  social:  "Social & Cultural Backgrounds"
};

// -------------------------------------
// BACKGROUNDS BY TYPE
// -------------------------------------
MarkedConfig.backgroundsByType = {
  common: {
    farmer:      "Farmer",
    hunter:      "Hunter",
    fisher:      "Fisher",
    laborer:     "Laborer",
    merchant:    "Merchant",
    shepherd:    "Shepherd",
    gravedigger: "Gravedigger",
    stable_hand: "Stable Hand",
    messenger:   "Messenger",
    woodcutter:  "Woodcutter",
    milkmaid:    "Milkmaid / Dairyman",
    field_hand:  "Field Hand",
    field_guide: "Field Guide",
    cook:        "Cook"
  },

  skilled: {
    blacksmith_app:  "Blacksmith’s Apprentice",
    herbalist:       "Herbalist",
    scribe:          "Scribe",
    tanner:          "Tanner",
    glassblower:     "Glassblower",
    weaver:          "Weaver",
    potter:          "Potter",
    chandler:        "Chandler (Candle Maker)",
    mason:           "Mason",
    bowyer_fletcher: "Bowyer/Fletcher",
    brewer:          "Brewer",
    tailor:          "Tailor",
    shipwright:      "Shipwright",
    jeweler:         "Jeweler",
    carpenter:       "Carpenter",
    calligrapher:    "Calligrapher",
    miner:           "Miner",
    tinker:          "Tinker",
    butcher:         "Butcher",
    cobbler:         "Cobbler",
    bookbinder:      "Bookbinder",
    painter:         "Painter",
    ropemaker:       "Ropemaker",
    armorer:         "Armorer",
    perfumer:        "Perfumer",
    // Optional second “Cook” flavor
    cook_skilled:    "Cook (Skilled)"
  },

  street: {
    urchin:          "Urchin",
    beggar:          "Beggar",
    street_perf:     "Street Performer",
    drudge:          "Drudge",
    pickpocket:      "Pickpocket",
    lookout:         "Lookout",
    runner:          "Runner",
    fence:           "Fence",
    rat_catcher:     "Rat Catcher",
    dockhand:        "Dockhand",
    scavenger:       "Scavenger",
    alley_healer:    "Alley Healer",
    street_preacher: "Street Preacher"
  },

  social: {
    noble_courtier:      "Noble Courtier",
    temple_acolyte:      "Temple Acolyte",
    clan_heir:           "Clan Heir",
    diplomatic_envoy:    "Diplomatic Envoy",
    wandering_pilgrim:   "Wandering Pilgrim",
    tribal_nomad:        "Tribal Nomad",
    scholars_ward:       "Scholar’s Ward",
    exiled_bloodline:    "Exiled Bloodline",
    cultural_artisan:    "Cultural Artisan",
    temple_foundling:    "Temple Foundling",
    guildborn:           "Guildborn",
    cult_survivor:       "Cult Survivor",
    diplomatic_hostage:  "Diplomatic Hostage",
    festival_child:      "Festival Child",
    marked_prophecy:     "Marked by Prophecy",
    monastic_disciple:   "Monastic Disciple",
    political_dissident: "Political Dissident",
    archivists_kin:      "Archivist’s Kin",
    hearth_storykeeper:  "Hearth-Bound Storykeeper",
    oath_retainer:       "Oath-Bound Retainer"
  }
};

// -------------------------------------
// BACKGROUND DESCRIPTIONS
// -------------------------------------
MarkedConfig.backgroundDescriptions = {
  farmer:      "Grew up working the land with patience and endurance.",
  hunter:      "Learned to track, stalk, and strike in the wilds.",
  fisher:      "Spent days by water, mastering rhythm and patience.",
  laborer:     "Built strength through long, grueling physical work.",
  merchant:    "Assisted with trade, haggling, and handling goods.",
  shepherd:    "Watched over herds in solitude and open terrain.",
  gravedigger: "Performed the quiet labor of burying the dead.",
  stable_hand: "Cared for mounts and beasts with steady hands.",
  messenger:   "Ran routes across dangerous roads without fail.",
  woodcutter:  "Harvested timber with strength and precision.",
  milkmaid:    "Handled livestock and crafted dairy goods.",
  field_hand:  "Worked another’s land for food or coin.",
  field_guide: "Led travelers through forests, hills, and hazards.",
  cook:        "Fed others with skill, speed, and simple magic.",

  blacksmith_app:  "Forged tools and weapons with fire and muscle.",
  herbalist:       "Knew which plants healed, poisoned, or soothed.",
  scribe:          "Copied and recorded with a practiced, steady hand.",
  tanner:          "Prepared hides through pungent, methodical work.",
  glassblower:     "Shaped molten art with breath and precision.",
  weaver:          "Spun thread and patterns with care and patience.",
  potter:          "Shaped clay into vessels, both fine and common.",
  chandler:        "Crafted candles and learned their chemistry.",
  mason:           "Carved stone and raised structures with grit.",
  bowyer_fletcher: "Built bows and arrows with balanced skill.",
  brewer:          "Brewed spirits and ales with craft and care.",
  tailor:          "Stitched garments and shaped fashions.",
  shipwright:      "Built and repaired vessels strong enough for the sea.",
  jeweler:         "Cut stones and crafted delicate ornamentation.",
  carpenter:       "Shaped wood into homes, carts, and keepsakes.",
  calligrapher:    "Wrote beautifully and knew the weight of ink.",
  miner:           "Delved deep for ore, stone, and risk.",
  tinker:          "Fixed, built, and modified with curious hands.",
  butcher:         "Cleanly carved flesh and knew meat well.",
  cobbler:         "Made and repaired shoes for every step of life.",
  bookbinder:      "Bound words and paper into lasting volumes.",
  painter:         "Captured life and memory in color and canvas.",
  ropemaker:       "Twisted fibers into life-saving cords and knots.",
  armorer:         "Crafted defense from metal, leather, and will.",
  perfumer:        "Blended oils and scents into memory and mood.",
  cook_skilled:    "Fed bellies and souls with crafted meals.",

  noble_courtier:      "Raised in privilege, trained in etiquette and subtlety.",
  temple_acolyte:      "Served in sacred spaces, learning faith and ritual.",
  clan_heir:           "Born to leadership with duties, pride, and expectation.",
  diplomatic_envoy:    "Traveled as a speaker of peace, trade, or threat.",
  wandering_pilgrim:   "Walked the land in devotion, reflection, or penance.",
  tribal_nomad:        "Grew up with the wind, fire, and path underfoot.",
  scholars_ward:       "Raised among scrolls, scholars, and quiet discipline.",
  exiled_bloodline:    "Cast out from legacy, but not from destiny.",
  cultural_artisan:    "Preserved traditions through craft and performance.",
  temple_foundling:    "Orphaned and raised in the care of divine orders.",
  guildborn:           "Raised in a powerful trade guild with deep loyalties.",
  cult_survivor:       "Escaped from dangerous dogma, but not its scars.",
  diplomatic_hostage:  "Lived among strangers, taught to survive by grace.",
  festival_child:      "Born during sacred rites, raised in joy and spectacle.",
  marked_prophecy:     "Branded by fate—celebrated or feared.",
  monastic_disciple:   "Trained in discipline, meditation, and martial forms.",
  political_dissident: "Raised to speak truth against power—at a cost.",
  archivists_kin:      "Lived in halls of memory, trained in preservation.",
  hearth_storykeeper:  "Held your people’s legends and history.",
  oath_retainer:       "Swore to serve one house or cause without fail.",

  urchin:          "Survived alone in alleys and rooftops with sharp instincts.",
  beggar:          "Lived off scraps and people’s pity with street-smarts.",
  street_perf:     "Entertained for coin with charm and flair.",
  drudge:          "Did thankless, dirty work while staying invisible.",
  pickpocket:      "Took what you needed without being caught.",
  lookout:         "Kept watch for trouble, escape, or opportunity.",
  runner:          "Delivered messages or goods quickly—legal or not.",
  fence:           "Traded in stolen goods and quiet connections.",
  rat_catcher:     "Hunted vermin in sewers and dark places.",
  dockhand:        "Hauled crates, tied lines, and learned who to avoid.",
  scavenger:       "Found value in others’ trash or misfortune.",
  alley_healer:    "Tended wounds with scraps, skill, and hope.",
  street_preacher: "Shouted truth or madness to anyone who’d listen."
};

// Optional: flat map of all backgrounds
MarkedConfig.backgrounds = {
  ...MarkedConfig.backgroundsByType.common,
  ...MarkedConfig.backgroundsByType.skilled,
  ...MarkedConfig.backgroundsByType.street,
  ...MarkedConfig.backgroundsByType.social
};

// -------------------------------------
// Marks of Purpose
// -------------------------------------
MarkedConfig.markOfPurpose = {
  none:       "No Mark",     // default placeholder
  alchemist:  "Alchemist",
  arcanist:   "Arcanist",
  berserker:  "Berserker",
  charlatan:  "Charlatan",
  defender:   "Defender",
  duelist:    "Duelist",
  enchanter:  "Enchanter",
  guardian:   "Guardian",
  hexer:      "Hexer",
  inquisitor: "Inquisitor",
  marksman:   "Marksman",
  mender:     "Mender",
  oracle:     "Oracle",
  pathfinder: "Pathfinder",
  psion:      "Psion",
  runesmith:  "Runesmith",
  skirmisher: "Skirmisher",
  spellblade: "Spellblade",
  striker:    "Striker",
  warden:     "Warden"
};

MarkedConfig.markOfPurposeDescriptions = {
  none:       "This character has not yet received a Mark of Purpose.",
  striker:    "Front-line damage dealer; decisive finishers.",
  defender:   "Line-holder; blocks lanes and peels pressure.",
  charlatan:  "Deception and ambush; trick-play specialist.",
  marksman:   "Ranged control and precision pickoffs.",
  skirmisher: "Mobile flanker; hit-and-run harassment.",
  enchanter:  "Buffs, wards, and battlefield shaping.",
  guardian:   "Wards and shielding; magical bodyguard.",
  mender:     "Field medicine, cleansing, stabilization.",
  arcanist:   "Direct spellcraft and measured counterspells.",
  spellblade: "Melee–magic hybrid imbuing steel.",
  pathfinder: "Scout/tracker; terrain and route control.",
  alchemist:  "Bombs, tonics, counters, and prep.",
  oracle:     "Foresight, omen-reading, protective wards.",
  warden:     "Nature sentinel; terrain control and protection.",
  inquisitor: "Witch-hunter; exposes and pressures casters.",
  hexer:      "Ailments, binds, and weakening curses.",
  duelist:    "Single-combat control; ripostes and tempo theft.",
  runesmith:  "Traps, wards, and placed battlefield devices.",
  berserker:  "Burst offense under pain; shock entry.",
  psion:      "Mind-force and perception edge; subtle control."
};

// -------------------------------------
// Race status & attribute modifiers
// -------------------------------------
MarkedConfig.raceStatus = {
  human: {
    status: {
      "vitality.max": 10,
      "mana.max": 10,
      "stamina.max": 10,
      "defense.value": 0,
      "reaction.value": 0,
      "trauma.max": 2,
      "pace.value": 5,
      "armor.max": 0,
      "shielding.value": 0
    }
  },
  etherean: {
    status: {
      "vitality.max": 8,
      "mana.max": 12,
      "stamina.max": 10,
      "defense.value": 0,
      "reaction.value": 0,
      "trauma.max": 2,
      "pace.value": 6,
      "armor.max": 0,
      "shielding.value": 1
    }
  },
  mythrian: {
    status: {
      "vitality.max": 12,
      "mana.max": 8,
      "stamina.max": 12,
      "defense.value": 0,
      "reaction.value": 0,
      "trauma.max": 2,
      "pace.value": 6,
      "armor.max": 1,
      "shielding.value": 0
    }
  },
  anthozoan: {
    status: {
      "vitality.max": 14,
      "mana.max": 8,
      "stamina.max": 10,
      "defense.value": 1,
      "reaction.value": 0,
      "trauma.max": 3,
      "pace.value": 4,
      "armor.max": 2,
      "shielding.value": 0
    }
  },
  sylvan: {
    status: {
      "vitality.max": 10,
      "mana.max": 10,
      "stamina.max": 12,
      "defense.value": 0,
      "reaction.value": 0,
      "trauma.max": 2,
      "pace.value": 6,
      "armor.max": 0,
      "shielding.value": 0
    }
  },
  sprite: {
    status: {
      "vitality.max": 8,
      "mana.max": 12,
      "stamina.max": 10,
      "defense.value": 0,
      "reaction.value": 1,
      "trauma.max": 1,
      "pace.value": 4,
      "armor.max": 0,
      "shielding.value": 1
    }
  },
  auramine: {
    status: {
      "vitality.max": 9,
      "mana.max": 13,
      "stamina.max": 9,
      "defense.value": 0,
      "reaction.value": 0,
      "trauma.max": 2,
      "pace.value": 6,
      "armor.max": 0,
      "shielding.value": 2
    }
  },
  draconian: {
    status: {
      "vitality.max": 13,
      "mana.max": 9,
      "stamina.max": 11,
      "defense.value": 1,
      "reaction.value": 0,
      "trauma.max": 3,
      "pace.value": 5,
      "armor.max": 2,
      "shielding.value": 0
    }
  },
  embergiest: {
    status: {
      "vitality.max": 9,
      "mana.max": 13,
      "stamina.max": 9,
      "defense.value": 0,
      "reaction.value": 0,
      "trauma.max": 2,
      "pace.value": 5,
      "armor.max": 0,
      "shielding.value": 2
    }
  },
  earthen: {
    status: {
      "vitality.max": 13,
      "mana.max": 8,
      "stamina.max": 11,
      "defense.value": 1,
      "reaction.value": 0,
      "trauma.max": 3,
      "pace.value": 4,
      "armor.max": 2,
      "shielding.value": 0
    }
  },
  prismatic: {
    status: {
      "vitality.max": 10,
      "mana.max": 12,
      "stamina.max": 10,
      "defense.value": 0,
      "reaction.value": 0,
      "trauma.max": 2,
      "pace.value": 5,
      "armor.max": 0,
      "shielding.value": 2
    }
  }
};

MarkedConfig.raceAttributes = {
  human: {
    "body.might": 2,
    "body.swiftness": 2,
    "mind.insight": 2,
    "mind.willpower": 2,
    "soul.presence": 2,
    "soul.resolve": 2
  },
  etherean: {
    "mind.insight": 2,
    "mind.quickness": 2,
    "soul.grace": 4
  },
  mythrian: {
    "body.might": 4,
    "body.swiftness": 2,
    "body.endurance": 4,
    "mind.insight": 2
  },
  anthozoan: {
    "body.might": 2,
    "body.endurance": 4,
    "soul.resolve": 2
  },
  sylvan: {
    "body.swiftness": 4,
    "body.endurance": 2,
    "mind.insight": 2,
    "soul.grace": 4
  },
  sprite: {
    "body.swiftness": 4,
    "mind.insight": 2,
    "mind.quickness": 2,
    "soul.grace": 4
  },
  auramine: {
    "mind.insight": 2,
    "soul.presence": 4,
    "soul.grace": 2,
    "soul.resolve": 4
  },
  draconian: {
    "body.might": 4,
    "body.endurance": 2,
    "soul.presence": 2
  },
  embergiest: {
    "body.endurance": 2,
    "mind.willpower": 2,
    "soul.presence": 2,
    "soul.resolve": 4
  },
  earthen: {
    "body.might": 2,
    "body.endurance": 4,
    "mind.willpower": 2
  },
  prismatic: {
    "mind.quickness": 2,
    "soul.presence": 2
  }
};

// ------------------------------------------------------
// Legacy aliases so old templates keep working
// ------------------------------------------------------
MarkedConfig.tribes         = MarkedConfig.mythrianTribes;
MarkedConfig.clans          = MarkedConfig.draconianClans;
MarkedConfig.marksOfPurpose = MarkedConfig.markOfPurpose;
MarkedConfig.marksPurpose   = MarkedConfig.markOfPurpose;

