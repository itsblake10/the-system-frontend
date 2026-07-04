/* -------------------------------------------------------------------------- */
/*                               MAIN OBJECTIVES                              */
/* -------------------------------------------------------------------------- */

export const mainObjectives = [
  {
    id: "o1",
    name: "Gym Workout",
    type: "objective",
    mma: false,
    amount: 0,
    goal: 0,
    reward: {
      xp: 250,
      coins: 25,
      stats: [
        { type: "STR", amount: 0.04 },
        { type: "AGI", amount: 0.02 },
        { type: "VIT", amount: 0.03 },
      ],
    },
    penalty: 25,
  },

  {
    id: "o2",
    name: "Cardio Workout",
    type: "objective",
    mma: false,
    amount: 0,
    goal: 0,
    reward: {
      xp: 250,
      coins: 25,
      stats: [
        { type: "AGI", amount: 0.03 },
        { type: "VIT", amount: 0.04 },
      ],
    },
    penalty: 25,
  },

  {
    id: "o3",
    name: "BJJ Class",
    type: "objective",
    mma: true,
    amount: 0,
    goal: 0,
    reward: {
      xp: 250,
      coins: 25,
      stats: [
        { type: "FIG", amount: 0.04 },
        { type: "AGI", amount: 0.03 },
        { type: "INT", amount: 0.01 },
        { type: "PER", amount: 0.02 },
        { type: "VIT", amount: 0.02 },
      ],
    },
    penalty: 25,
  },

  {
    id: "o4",
    name: "Judo Class",
    type: "objective",
    mma: true,
    amount: 0,
    goal: 0,
    reward: {
      xp: 250,
      coins: 25,
      stats: [
        { type: "STR", amount: 0.01 },
        { type: "VIT", amount: 0.01 },
      ],
    },
    penalty: 25,
  },

  {
    id: "o5",
    name: "Muay-Thai Class",
    type: "objective",
    mma: true,
    amount: 0,
    goal: 0,
    reward: {
      xp: 250,
      coins: 25,
      stats: [
        { type: "FIG", amount: 0.04 },
        { type: "STR", amount: 0.03 },
        { type: "AGI", amount: 0.04 },
        { type: "VIT", amount: 0.04 },
        { type: "PER", amount: 0.02 },
        { type: "INT", amount: 0.01 },
      ],
    },
    penalty: 25,
  },

  {
    id: "o6",
    name: "Boxing Class",
    type: "objective",
    mma: true,
    amount: 0,
    goal: 0,
    reward: {
      xp: 250,
      coins: 25,
      stats: [
        { type: "FIG", amount: 0.04 },
        { type: "STR", amount: 0.03 },
        { type: "AGI", amount: 0.03 },
        { type: "VIT", amount: 0.04 },
        { type: "PER", amount: 0.02 },
        { type: "INT", amount: 0.01 },
      ],
    },
    penalty: 25,
  },

  {
    id: "o7",
    name: "Yoga Class",
    type: "objective",
    mma: false,
    amount: 0,
    goal: 0,
    reward: {
      xp: 250,
      coins: 25,
      stats: [
        { type: "AGI", amount: 0.04 },
        { type: "PER", amount: 0.04 },
      ],
    },
    penalty: 25,
  },
];
