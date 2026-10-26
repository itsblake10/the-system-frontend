/* -------------------------------------------------------------------------- */
/*                                DAILY QUESTS                                */
/* -------------------------------------------------------------------------- */

export const dailyQuests = [
  {
    id: "q1",
    name: "Push-ups",
    type: "quest",
    mma: false,
    amount: 0,
    goal: 0,
    reward: {
      xp: 50,
      coins: 5,
      stats: [
        { type: "STR", amount: 0.01 },
        { type: "VIT", amount: 0.01 },
      ],
    },
    penalty: 25,
  },

  {
    id: "q2",
    name: "Sit-ups",
    type: "quest",
    mma: false,
    amount: 0,
    goal: 0,
    reward: {
      xp: 50,
      coins: 5,
      stats: [
        { type: "STR", amount: 0.01 },
        { type: "VIT", amount: 0.01 },
      ],
    },
    penalty: 25,
  },

  {
    id: "q3",
    name: "Chin/Pull-ups",
    type: "quest",
    mma: false,
    amount: 0,
    goal: 0,
    reward: {
      xp: 50,
      coins: 5,
      stats: [
        { type: "STR", amount: 0.01 },
        { type: "VIT", amount: 0.01 },
      ],
    },
    penalty: 25,
  },

  {
    id: "q4",
    name: "Squats",
    type: "quest",
    mma: false,
    amount: 0,
    goal: 0,
    reward: {
      xp: 50,
      coins: 5,
      stats: [
        { type: "STR", amount: 0.01 },
        { type: "VIT", amount: 0.01 },
      ],
    },
    penalty: 25,
  },

  {
    id: "q5",
    name: "Hand Gripper",
    type: "quest",
    mma: true,
    amount: 0,
    goal: 0,
    reward: {
      xp: 50,
      coins: 5,
      stats: [
        { type: "STR", amount: 0.01 },
        { type: "FIG", amount: 0.01 },
      ],
    },
    penalty: 25,
  },

  {
    id: "q6",
    name: "Skipping",
    type: "quest",
    mma: false,
    amount: 0,
    goal: 0,
    reward: {
      xp: 50,
      coins: 5,
      stats: [
        { type: "AGI", amount: 0.01 },
        { type: "VIT", amount: 0.02 },
      ],
    },
    penalty: 25,
  },
];
