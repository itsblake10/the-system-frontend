/* -------------------------------------------------------------------------- */
/*                               PLAYER REDUCER                               */
/* -------------------------------------------------------------------------- */
export function playerReducer(state, action) {
  switch (action.type) {
    /* --------------------------------- GAIN XP -------------------------------- */
    case "GAIN_XP": {
      const newXP = state.playerLevel.xp + action.payload;

      if (newXP >= state.playerLevel.xpToNextLevel) {
        return {
          ...state,
          playerLevel: {
            ...state.playerLevel,
            xp: newXP - state.playerLevel.xpToNextLevel,
            level: state.playerLevel.level + 1,
            xpToNextLevel: state.playerLevel.xpToNextLevel + 500,
          },
        };
      }

      return {
        ...state,
        playerLevel: {
          ...state.playerLevel,
          xp: newXP,
        },
      };
    }

    /* -------------------------- COMPLETE DAILY QUEST -------------------------- */
    case "COMPLETE_DAILY_QUEST": {
    }
  }
}
