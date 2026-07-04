/* -------------------------------------------------------------------------- */
/*                            INITIAL PLAYER STATE                            */
/* -------------------------------------------------------------------------- */
import { getNextDailyReset, getNextWeeklyReset } from "./countdowns.js";

export const initialPlayerState = {
  /* --------------------------------- PROFILE -------------------------------- */
  playerInformation: {
    username: "",
    title: "Unassigned",
    class: "Unassigned",
    avatar: "",
  },

  playerStatus: {
    health: 1000,
    maxHealth: 1000,
    armor: 0,
    mana: 0,
    maxMana: 500,
  },

  /* ------------------------------- PROGRESSION ------------------------------ */
  playerLevel: {
    level: 1,
    xp: 0,
    xpToNextLevel: 1000,
  },

  playerStats: {
    str: 0,
    agi: 0,
    per: 0,
    vit: 0,
    int: 0,
    fig: 0,
  },

  /* --------------------------------- ECONOMY -------------------------------- */
  currency: {
    coins: 0,
    manaCrystals: 0,
    raidKeys: 0,
  },

  inventory: [],

  /* -------------------------------- GAMEPLAY -------------------------------- */
  dailyQuests: {
    taskList: [],
    nextDailyReset: getNextDailyReset(),
  },

  mainObjectives: {
    taskList: [],
    nextWeeklyReset: getNextWeeklyReset(),
  },

  activeRaid: null,
};
