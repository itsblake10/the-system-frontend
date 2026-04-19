/* -------------------------------------------------------------------------- */
/*                            INITIAL PLAYER STATE                            */
/* -------------------------------------------------------------------------- */

export const initialPlayerState = {
  /* --------------------------------- PROFILE -------------------------------- */
  playerInformation: {
    username: "Player_one",
    title: "Unassigned",
    class: "Unassigned",
    avatar: "",
  },

  PlayerStatus: {
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

  stats: {
    strength: 0,
    agility: 0,
    perception: 0,
    vitality: 0,
    intelligence: 0,
    fighting: 0,
  },

  /* --------------------------------- ECONOMY -------------------------------- */
  currency: {
    coins: 0,
    manaCrystals: 0,
    raidKeys: 0,
  },

  inventory: [],

  /* -------------------------------- GAMEPLAY -------------------------------- */
  DailyQuests: {
    questList: [],
    nextDailyReset: null,
  },

  mainObjectives: {
    objectiveList: [],
    nextWeeklyReset: null,
  },

  activeRaid: null,
};
