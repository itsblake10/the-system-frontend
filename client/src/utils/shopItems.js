/* ------------------------------- SHOP ITEMS ------------------------------- */
import combatKnife from "../../public/combat-knife.svg";
import healthPotion from "../../public/health-potion.svg";
import armorPlate from "../../public/armor-plate.svg";
import karambitKnife from "../../public/karambit-knife.svg";
import kunai from "../../public/kunai.svg";
import trenchKnife from "../../public/trench-knife.svg";
import machete from "../../public/machete.svg";
import butterflyKnife from "../../public/butterfly-knife.svg";
import katana from "../../public/katana.svg";
import kukri from "../../public/kukri.svg";
import battleAxe from "../../public/battle-axe.svg";
import cutlassSword from "../../public/cutlass-sword.svg";
import switchblade from "../../public/switchblade.svg";
import scythe from "../../public/scythe.svg";
import bowieKnife from "../../public/bowie-knife.svg";
import pushDaggers from "../../public/push-daggers.svg";
import scimitar from "../../public/scimitar.svg";
import celticSword from "../../public/celtic-sword.svg";
import longsword from "../../public/longsword.svg";
import longbow from "../../public/longbow.svg";
import compoundBow from "../../public/compound-bow.svg";

export const shopItems = [
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
    levelRequirement: 1,
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
    levelRequirement: 7,
    description:
      "Military style fixed blade knife. Get up close and personal with your enemy!.",
    image: combatKnife,
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
    levelRequirement: 4,
    description: "???",
    image: switchblade,
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
    levelRequirement: 32,
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
    levelRequirement: 25,
    description: "A classic. Some problems are best solved with a Machete.",
    image: machete,
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
    levelRequirement: 23,
    description: "???",
    image: karambitKnife,
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
    levelRequirement: 12,
    description: "???",
    image: butterflyKnife,
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
    levelRequirement: 27,
    description: "???",
    image: kunai,
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
    levelRequirement: 30,
    description: "Worked well in WW1, works well now.",
    image: trenchKnife,
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
    levelRequirement: 28,
    description: "???",
    image: bowieKnife,
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
    levelRequirement: 26,
    description: "???",
    image: pushDaggers,
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
    levelRequirement: 22,
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
    levelRequirement: 10,
    description:
      "Curved sword, originating from the Middle East, South Asia, and North Africa.",
    image: scimitar,
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
    levelRequirement: 8,
    description: "The Longsword. You're gonna need two hands for this one ;)",
    image: longsword,
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
    levelRequirement: 22,
    description:
      "Traditional Japanese sword used by Samurai warriors... or ordinary people like you I guess.",
    image: katana,
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
    levelRequirement: 40,
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
    levelRequirement: 20,
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
    levelRequirement: 9,
    description: "???",
    image: kukri,
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
    levelRequirement: 6,
    description: "???",
    image: celticSword,
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
    levelRequirement: 25,
    description: "???",
    image: cutlassSword,
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
    levelRequirement: 4,
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
    levelRequirement: 22,
    description: "???",
    image: battleAxe,
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
    levelRequirement: 37,
    description: "???",
    image: scythe,
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
    levelRequirement: 5,
    description: "???",
    image: longbow,
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
    levelRequirement: 10,
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
    levelRequirement: 36,
    description: "???",
    image: compoundBow,
  },

  /* -------------------------------------------------------------------------- */
  /*                                    ARMOR                                   */
  /* -------------------------------------------------------------------------- */
  {
    id: "a1",
    name: "Plain Armor",
    itemType: "Armor",
    effect: {
      damage: 10,
    },
    price: {
      buy: 250,
      sell: 200,
    },
    levelRequirement: 3,
    description: "Plain armor plate for protection.",
    image: armorPlate,
  },

  {
    id: "a2",
    name: "Re-enforced Armor",
    itemType: "Armor",
    effect: {
      damage: 25,
    },
    price: {
      buy: 400,
      sell: 300,
    },
    levelRequirement: 10,
    description: "Re-enforced armor plate for extra protection.",
  },

  {
    id: "a3",
    name: "Titanium Armor",
    itemType: "Armor",
    effect: {
      damage: 40,
    },
    price: {
      buy: 600,
      sell: 500,
    },
    levelRequirement: 30,
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
    image: healthPotion,
  },
];
