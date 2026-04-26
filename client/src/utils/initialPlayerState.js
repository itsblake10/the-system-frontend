/* -------------------------------------------------------------------------- */
/*                            INITIAL PLAYER STATE                            */
/* -------------------------------------------------------------------------- */
import { getNextDailyReset, getNextWeeklyReset } from "./dateResets";

export const initialPlayerState = {
  /* --------------------------------- PROFILE -------------------------------- */
  playerInformation: {
    username: "Player_one",
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

  stats: {
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
    questList: [
      {
        id: "q1",
        name: "Push-ups",
        currentAmount: 0,
        goalAmount: 50,
        completed: false,
      },
      {
        id: "q2",
        name: "Sit-ups",
        currentAmount: 0,
        goalAmount: 50,
        completed: false,
      },
    ],
    nextDailyReset: getNextDailyReset(),
  },

  mainObjectives: {
    objectiveList: [
      {
        id: "o1",
        name: "Gym Workout",
        currentAmount: 0,
        goalAmount: 3,
        completed: false,
      },
    ],
    nextWeeklyReset: getNextWeeklyReset(),
  },

  activeRaid: null,
};
