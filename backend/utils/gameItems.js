/* ------------------------------- GAME ITEMS ------------------------------- */

export const gameItems = [
  /* -------------------------------------------------------------------------- */
  /*                                   WEAPONS                                  */
  /* -------------------------------------------------------------------------- */

  /* --------------------------------- KNIVES --------------------------------- */
  {
    id: "wk1",
    name: "Bone Dagger",
    itemType: "Weapon",
    weaponType: "Knife",
    rarity: "Common",
    effect: {
      damage: 3,
    },
    price: {
      buy: 100,
      sell: 50,
    },
    level: 1,
    description: "Dagger made from someones bones, don't ask who...",
  },

  {
    id: "wk2",
    name: "Combat Knife",
    itemType: "Weapon",
    weaponType: "Knife",
    rarity: "Common",
    effect: {
      damage: 9,
    },
    price: {
      buy: 500,
      sell: 400,
    },
    level: 7,
    description:
      "Military style fixed blade knife. Get up close and personal with your enemy!.",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385699/combat-knife_svxacr.svg",
  },

  {
    id: "wk3",
    name: "Switchblade",
    itemType: "Weapon",
    weaponType: "Knife",
    rarity: "Common",
    effect: {
      damage: 5,
    },
    price: {
      buy: 300,
      sell: 300,
    },
    level: 4,
    description: "???",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385695/switchblade_zypfdz.svg",
  },

  {
    id: "wk4",
    name: "Dragon Scale Dagger",
    itemType: "Weapon",
    weaponType: "knife",
    effect: {
      damage: 35,
    },
    price: {
      buy: 2000,
      sell: 1800,
    },
    level: 32,
    description:
      "A knife made from the scale of a dragon. How does one aquire a dragon scale? no clue.",
  },

  {
    id: "wk5",
    name: "Machete",
    itemType: "Weapon",
    weaponType: "knife",
    effect: {
      damage: 20,
    },
    price: {
      buy: 950,
      sell: 800,
    },
    level: 25,
    description: "A classic. Some problems are best solved with a Machete.",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385700/machete_ojujuy.svg",
  },

  {
    id: "wk6",
    name: "Karambit",
    itemType: "Weapon",
    weaponType: "knife",
    effect: {
      damage: 18,
    },
    price: {
      buy: 900,
      sell: 800,
    },
    level: 23,
    description: "???",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385698/karambit-knife_ewic6j.svg",
  },

  {
    id: "wk7",
    name: "Butterfly Knife",
    itemType: "Weapon",
    weaponType: "knife",
    effect: {
      damage: 15,
    },
    price: {
      buy: 850,
      sell: 750,
    },
    level: 12,
    description: "???",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385694/butterfly-knife_d6wr2g.svg",
  },

  {
    id: "wk8",
    name: "Kunai",
    itemType: "Weapon",
    weaponType: "knife",
    effect: {
      damage: 24,
    },
    price: {
      buy: 1200,
      sell: 1000,
    },
    level: 27,
    description: "???",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385704/kunai_nyaxii.svg",
  },

  {
    id: "wk9",
    name: "Trench Knife",
    itemType: "Weapon",
    weaponType: "knife",
    effect: {
      damage: 30,
    },
    price: {
      buy: 1800,
      sell: 1700,
    },
    level: 30,
    description: "Worked well in WW1, works well now.",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385702/trench-knife_tcjsqt.svg",
  },

  {
    id: "wk10",
    name: "Bowie Knife",
    itemType: "Weapon",
    weaponType: "knife",
    effect: {
      damage: 27,
    },
    price: {
      buy: 1700,
      sell: 1550,
    },
    level: 28,
    description: "???",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385691/bowie-knife_wyhe0l.svg",
  },

  {
    id: "wk11",
    name: "Push Daggers",
    itemType: "Weapon",
    weaponType: "knife",
    effect: {
      damage: 22,
    },
    price: {
      buy: 1000,
      sell: 850,
    },
    level: 26,
    description: "???",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385691/push-daggers_pdvwax.svg",
  },

  {
    id: "wk12",
    name: "Beast Fang Dagger",
    itemType: "Weapon",
    weaponType: "knife",
    effect: {
      damage: 17,
    },
    price: {
      buy: 850,
      sell: 750,
    },
    level: 22,
    description: "Dagger made from a large fang belonging to a wild beast.",
  },

  /* --------------------------------- SWORDS --------------------------------- */
  {
    id: "ws1",
    name: "Scimitar",
    itemType: "Weapon",
    weaponType: "Sword",
    rarity: "Common",
    effect: {
      damage: 15,
    },
    price: {
      buy: 750,
      sell: 650,
    },
    level: 10,
    description:
      "Curved sword, originating from the Middle East, South Asia, and North Africa.",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385690/scimitar_jgsvw8.svg",
  },

  {
    id: "ws2",
    name: "Longsword",
    itemType: "Weapon",
    weaponType: "Sword",
    rarity: "Common",
    effect: {
      damage: 10,
    },
    price: {
      buy: 600,
      sell: 500,
    },
    level: 8,
    description: "The Longsword. You're gonna need two hands for this one ;)",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385687/longsword_a2oxok.svg",
  },

  {
    id: "ws3",
    name: "Katana",
    itemType: "Weapon",
    weaponType: "Sword",
    effect: {
      damage: 27,
    },
    price: {
      buy: 1900,
      sell: 1700,
    },
    level: 22,
    description:
      "Traditional Japanese sword used by Samurai warriors... or ordinary people like you I guess.",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385697/katana_vx1bq1.svg",
  },

  {
    id: "ws4",
    name: "Excalibur",
    itemType: "Weapon",
    weaponType: "Sword",
    effect: {
      damage: 37,
    },
    price: {
      buy: 2200,
      sell: 1900,
    },
    level: 40,
    description:
      "The legendary Excalibur sword, only the chosen can weild this sword.",
  },

  {
    id: "ws5",
    name: "Carolingian Sword",
    itemType: "Weapon",
    weaponType: "Sword",
    effect: {
      damage: 22,
    },
    price: {
      buy: 1100,
      sell: 1000,
    },
    level: 20,
    description: "???",
  },

  {
    id: "ws6",
    name: "Kukri",
    itemType: "Weapon",
    weaponType: "Sword",
    effect: {
      damage: 13,
    },
    price: {
      buy: 800,
      sell: 700,
    },
    level: 9,
    description: "???",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385697/kukri_y4ocj6.svg",
  },

  {
    id: "ws7",
    name: "Celtic Sword",
    itemType: "Weapon",
    weaponType: "Sword",
    effect: {
      damage: 8,
    },
    price: {
      buy: 600,
      sell: 500,
    },
    level: 6,
    description: "???",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385687/celtic-sword_znpz9i.svg",
  },

  {
    id: "ws8",
    name: "Cutlass Sword",
    itemType: "Weapon",
    weaponType: "Sword",
    effect: {
      damage: 24,
    },
    price: {
      buy: 1100,
      sell: 900,
    },
    level: 25,
    description: "???",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385686/cutlass-sword_pgurk3.svg",
  },

  /* -------------------------------- POLEARMS -------------------------------- */
  {
    id: "wp1",
    name: "Spear",
    itemType: "Weapon",
    weaponType: "Polearm",
    rarity: "Common",
    effect: {
      damage: 5,
    },
    price: {
      buy: 300,
      sell: 200,
    },
    level: 4,
    description: "???",
  },

  {
    id: "wp2",
    name: "Battle-Axe",
    itemType: "Weapon",
    weaponType: "Polearm",
    rarity: "Common",
    effect: {
      damage: 17,
    },
    price: {
      buy: 900,
      sell: 800,
    },
    level: 22,
    description: "???",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385696/battle-axe_ruwa2f.svg",
  },

  {
    id: "wp3",
    name: "Scythe",
    itemType: "Weapon",
    weaponType: "Polearm",
    rarity: "Common",
    effect: {
      damage: 35,
    },
    price: {
      buy: 2200,
      sell: 2000,
    },
    level: 37,
    description: "???",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385692/scythe_debafo.svg",
  },

  /* --------------------------------- ARCHERY -------------------------------- */
  {
    id: "wa1",
    name: "Longbow",
    itemType: "Weapon",
    weaponType: "Archery",
    rarity: "Common",
    effect: {
      damage: 10,
    },
    price: {
      buy: 650,
      sell: 550,
    },
    level: 5,
    description: "???",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385685/longbow_qw2w9x.svg",
  },

  {
    id: "wa2",
    name: "Crossbow",
    itemType: "Weapon",
    weaponType: "Archery",
    rarity: "Common",
    effect: {
      damage: 15,
    },
    price: {
      buy: 950,
      sell: 800,
    },
    level: 10,
    description: "???",
  },

  {
    id: "wa2",
    name: "Compound Bow",
    itemType: "Weapon",
    weaponType: "Archery",
    rarity: "Common",
    effect: {
      damage: 32,
    },
    price: {
      buy: 2250,
      sell: 2100,
    },
    level: 36,
    description: "???",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385684/compound-bow_abvvzd.svg",
  },

  /* -------------------------------------------------------------------------- */
  /*                                    ARMOR                                   */
  /* -------------------------------------------------------------------------- */
  {
    id: "a1",
    name: "Plain Armor",
    itemType: "Armor",
    quantity: 0,
    effect: {
      armor: 10,
    },
    price: {
      buy: 250,
      sell: 200,
    },
    level: 3,
    description: "Plain armor plate for protection.",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385685/armor-plate_whscrs.svg",
  },

  {
    id: "a2",
    name: "Re-enforced Armor",
    itemType: "Armor",
    quantity: 0,
    effect: {
      armor: 25,
    },
    price: {
      buy: 400,
      sell: 300,
    },
    level: 10,
    description: "Re-enforced armor plate for extra protection.",
  },

  {
    id: "a3",
    name: "Titanium Armor",
    itemType: "Armor",
    quantity: 0,
    effect: {
      armor: 40,
    },
    price: {
      buy: 600,
      sell: 500,
    },
    level: 30,
    description: "Titanium armor plate for extra extra protection.",
  },

  /* -------------------------------------------------------------------------- */
  /*                                 CONSUMABLES                                */
  /* -------------------------------------------------------------------------- */
  {
    id: "c1",
    name: "Health Potion",
    itemType: "Consumable",
    effect: {
      health: 100,
    },
    price: {
      buy: 100,
      sell: 50,
    },
    description: "Restores players Health.",
    image:
      "https://res.cloudinary.com/dsvu6oqd2/image/upload/v1789385684/health-potion_xaxdus.svg",
  },
];
