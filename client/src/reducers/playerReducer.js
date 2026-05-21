/* -------------------------------------------------------------------------- */
/*                               PLAYER REDUCER                               */
/* -------------------------------------------------------------------------- */
import { getNextDailyReset, getNextWeeklyReset } from "../utils/dateResets";
import { applyXp } from "../../src/gameSystems/xpSystem.js";
import { applyDamage } from "../gameSystems/damageSystem.js";
import { applyStats } from "../gameSystems/statSystem.js";

export function playerReducer(state, action) {
  switch (action.type) {
    /* ----------------------------- INCREMENT_TASK ----------------------------- */
    case "INCREMENT_TASK": {
      const { taskId, section } = action.payload;

      const updatedList = state[section].taskList.map((task) => {
        if (task.id !== taskId) return task;

        const newAmount = Math.min(task.currentAmount + 1, task.goalAmount);

        return {
          ...task,
          currentAmount: newAmount,
          completed: newAmount >= task.goalAmount,
        };
      });

      return {
        ...state,
        [section]: {
          ...state[section],
          taskList: updatedList,
        },
      };
    }

    /* ----------------------------- DECREMENT TASK ----------------------------- */

    case "DECREMENT_TASK": {
      const { taskId, section } = action.payload;

      const updatedList = state[section].taskList.map((task) => {
        if (task.id !== taskId) return task;

        const newAmount = Math.max(task.currentAmount - 1, 0);

        return {
          ...task,
          currentAmount: newAmount,
          completed: newAmount >= task.goalAmount,
        };
      });

      return {
        ...state,
        [section]: {
          ...state[section],
          taskList: updatedList,
        },
      };
    }

    /* ------------------------------- RESET DAILY ------------------------------ */
    case "RESET_DAILY": {
      let playerLevel = state.playerLevel;
      let playerStatus = state.playerStatus;
      let playerStats = state.playerStats;

      const updatedTasks = state.dailyQuests.taskList.map((task) => {
        if (task.completed) {
          playerLevel = applyXp(playerLevel, task.reward?.xp || 0);
          playerStats = applyStats(playerStats, task.reward.stats);
        } else {
          playerStatus = applyDamage(playerStatus, task.penalty || 0);
        }

        return {
          ...task,
          currentAmount: 0,
          completed: false,
        };
      });

      return {
        ...state,
        playerLevel,
        playerStatus,
        playerStats,
        dailyQuests: {
          ...state.dailyQuests,
          taskList: updatedTasks,
          nextDailyReset: getNextDailyReset(),
        },
      };
    }

    /* ------------------------------ RESET WEEKLY ------------------------------ */
    case "RESET_WEEKLY": {
      let playerLevel = state.playerLevel;
      let playerStats = state.playerStats;

      const updatedTasks = state.mainObjectives.taskList.map((task) => {
        if (task.completed) {
          playerLevel = applyXp(playerLevel, task.reward?.xp || 0);
          playerStats = applyStats(playerStats, task.reward.stats);
        }

        return {
          ...task,
          currentAmount: 0,
          completed: false,
        };
      });

      return {
        ...state,
        playerLevel,
        playerStats,
        mainObjectives: {
          ...state.mainObjectives,
          taskList: updatedTasks,
          nextWeeklyReset: getNextWeeklyReset(),
        },
      };
    }

    /* ------------------------------- LOAD PLAYER ------------------------------ */
    case "LOAD_PLAYER": {
      return action.payload;
    }

    /* --------------------------- GAIN XP / LEVEL UP --------------------------- */
    // case "GAIN_XP": {
    //   return {
    //     ...state,
    //     playerLevel: applyXp(state.playerLevel, action.payload),
    //   };
    // }
  }
}
