/* -------------------------------------------------------------------------- */
/*                            INITIAL PLAYER STATE                            */
/* -------------------------------------------------------------------------- */
import { getNextDailyReset, getNextWeeklyReset } from "./dateResets";

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
    taskList: [
      {
        id: "q1",
        name: "Push-ups",
        currentAmount: 0,
        goalAmount: 50,
        completed: false,
        reward: {
          xp: 250,
          stats: [{ type: "str", amount: 0.01 }],
        },
        penalty: 25,
      },
      {
        id: "q2",
        name: "Sit-ups",
        currentAmount: 0,
        goalAmount: 50,
        completed: false,
        reward: {
          xp: 250,
          stats: [{ type: "str", amount: 0.01 }],
        },
        penalty: 25,
      },
    ],
    nextDailyReset: getNextDailyReset(),
  },

  mainObjectives: {
    taskList: [
      {
        id: "o1",
        name: "Gym Workout",
        currentAmount: 0,
        goalAmount: 3,
        completed: false,
        reward: {
          xp: 500,
          stats: [
            { type: "str", amount: 0.1 },
            { type: "vit", amount: 0.2 },
          ],
        },
      },
    ],
    nextWeeklyReset: getNextWeeklyReset(),
  },

  activeRaid: null,
};
