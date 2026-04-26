/* -------------------------------------------------------------------------- */
/*                               PLAYER REDUCER                               */
/* -------------------------------------------------------------------------- */
export function playerReducer(state, action) {
  switch (action.type) {
    /* --------------------------- GAIN XP / LEVEL UP --------------------------- */
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
      const updatedQuests = state.dailyQuests.questList.map((quest) =>
        quest.id === action.payload ? { ...quest, completed: true } : quest,
      );

      return {
        ...state,
        dailyQuests: updatedQuests,
      };
    }

    /* ---------------------------- MISS DAILY QUEST ---------------------------- */
    case "MISS_DAILY_QUEST": {
      let newArmor = state.playerStatus.armor - 10;
      let newHealth = state.playerStatus.health;

      if (newArmor < 0) {
        newHealth += newArmor;
        newArmor = 0;
      }

      return {
        ...state,
        playerStatus: {
          ...state.playerStatus,
          armor: newArmor,
          health: Math.max(newHealth, 0),
        },
      };
    }

    /* ------------------------- COMPLETE MAIN OBJECTIVE ------------------------ */
    case "COMPLETE_MAIN_OBJECTIVE": {
      const updatedObjectives = state.mainObjectives.objectiveList.map(
        (objective) =>
          objective.id === action.payload
            ? { ...objective, completed: true }
            : objective,
      );

      return {
        ...state,
        mainObjectives: updatedObjectives,
      };
    }

    /* --------------------------- MISS MAIN OBJECTIVE -------------------------- */
    // case "MISS_MAIN_OBJECTIVE": {
    //   let newArmor = state.playerStatus.armor - 10;
    //   let newHealth = state.playerStatus.health;

    //   if (newArmor < 0) {
    //     newHealth += newArmor;
    //     newArmor = 0;
    //   }

    //   return {
    //     ...state,
    //     playerStatus: {
    //       ...state.playerStatus,
    //       armor: newArmor,
    //       health: Math.max(newHealth, 0),
    //     },
    //   };
    // }

    default:
      return state;
  }
}
