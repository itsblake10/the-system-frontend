/* ------------------------------- GAME ITEMS ------------------------------- */
import combatKnife from "../../public/combat-knife.svg";
import healthPotion from "../../public/health-potion.svg";
import armorPlate from "../../public/armor-plate.svg";
import karambitKnife from "../../public/karambit-knife.svg";
import manaCrystals from "../../public/mana-crystals.svg";
import manaPotion from "../../public/mana-potion.svg";
import kukri from "../../public/kukri.svg";
import battleAxe from "../../public/battle-axe.svg";
import scimitar from "../../public/scimitar.svg";
import longsword from "../../public/longsword.svg";
import longbow from "../../public/longbow.svg";

export const items = [
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
    levelRequirement: 7,
    description:
      "Military style fixed blade knife. Get up close and personal with your enemy!.",
    image: combatKnife,
  },

  {
    id: "wk6",
    name: "Karambit",
    itemType: "Weapon",
    weaponType: "knife",
    effect: {
      damage: 18,
    },
    levelRequirement: 23,
    description: "???",
    image: karambitKnife,
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
    levelRequirement: 8,
    description: "The Longsword. You're gonna need two hands for this one ;)",
    image: longsword,
  },

  {
    id: "ws6",
    name: "Kukri",
    itemType: "Weapon",
    weaponType: "Sword",
    effect: {
      damage: 13,
    },
    levelRequirement: 9,
    description: "???",
    image: kukri,
  },

  /* -------------------------------- POLEARMS -------------------------------- */
  {
    id: "wp2",
    name: "Battle-Axe",
    itemType: "Weapon",
    weaponType: "Polearm",
    rarity: "Common",
    effect: {
      damage: 17,
    },
    levelRequirement: 22,
    description: "???",
    image: battleAxe,
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
    levelRequirement: 5,
    description: "???",
    image: longbow,
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
    levelRequirement: 10,
    description: "Re-enforced armor plate for extra protection.",
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
    description: "Restores players Health.",
    image: healthPotion,
  },

  {
    id: "c2",
    name: "Mana Potion",
    itemType: "Consumable",
    effect: {
      mana: 100,
    },
    description: "Restores players Mana.",
    image: manaPotion,
  },

  /* -------------------------------------------------------------------------- */
  /*                                  CRAFTING                                  */
  /* -------------------------------------------------------------------------- */
  {
    id: "cr1",
    name: "Mana Crystals",
    itemType: "Crafting",
    crystalsNeeded: 50,
    description: "You can use this item to craft Mana potions.",
    image: manaCrystals,
  },
];
