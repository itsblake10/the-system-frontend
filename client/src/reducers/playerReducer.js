/* -------------------------------------------------------------------------- */
/*                               PLAYER REDUCER                               */
/* -------------------------------------------------------------------------- */
import { getNextDailyReset, getNextWeeklyReset } from "../utils/countdowns.js";
import { applyXp } from "../../src/gameSystems/xpSystem.js";
import { applyDamage } from "../gameSystems/damageSystem.js";
import { applyStats } from "../gameSystems/statSystem.js";
import { applyCurrency } from "../gameSystems/currencySystem.js";

export function playerReducer(state, action) {
  switch (action.type) {
    /* ----------------------------- INCREMENT_TASK ----------------------------- */
    case "INCREMENT_TASK": {
      const { taskId, section } = action.payload;

      const updatedList = (state[section]?.taskList ?? []).map((task) => {
        if (task.id !== taskId) return task;

        const newAmount = Math.min(task.amount + 1, task.goal);

        return {
          ...task,
          amount: newAmount,
          completed: newAmount >= task.goal,
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

      const updatedList = (state[section]?.taskList ?? []).map((task) => {
        if (task.id !== taskId) return task;

        const newAmount = Math.max(task.amount - 1, 0);

        return {
          ...task,
          amount: newAmount,
          completed: newAmount >= task.goal,
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
      let playerCurrency = state.currency;

      const updatedTasks = state.dailyQuests.taskList.map((task) => {
        if (task.completed) {
          playerLevel = applyXp(playerLevel, task.reward?.xp || 0);

          playerStats = applyStats(playerStats, task.reward?.stats || []);

          playerCurrency = applyCurrency(playerCurrency, task.reward || {});
        } else {
          playerStatus = applyDamage(playerStatus, task.penalty || 0);
        }

        return {
          ...task,
          amount: 0,
          completed: false,
        };
      });

      return {
        ...state,
        playerLevel,
        playerStatus,
        playerStats,
        currency: playerCurrency,
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
          playerStats = applyStats(playerStats, task.reward?.stats || []);
        }

        return {
          ...task,
          amount: 0,
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
      return {
        ...state,
        ...action.payload,
      };
    }

    /* -------------------------- ONBOARDING COMPLETION ------------------------- */
    case "COMPLETE_ONBOARDING": {
      return {
        ...state,
        mmaMode: action.payload.mmaMode,

        dailyQuests: {
          ...state.dailyQuests,
          taskList: action.payload.dailyQuests.taskList,
        },

        mainObjectives: {
          ...state.mainObjectives,
          taskList: action.payload.mainObjectives.taskList,
        },

        onboarding: action.payload.onboarding,
      };
    }

    /* -------------------------- UPDATE GAME SETTINGS -------------------------- */
    case "UPDATE_GAME_SETTINGS": {
      return {
        ...state,
        mmaMode: action.payload.mmaMode ?? state.mmaMode,

        dailyQuests: {
          ...state.dailyQuests,
          ...action.payload.dailyQuests,
        },

        mainObjectives: {
          ...state.mainObjectives,
          ...action.payload.mainObjectives,
        },
      };
    }

    /* ----------------------------- UPDATE USERNAME ---------------------------- */
    case "UPDATE_PLAYER_INFO": {
      return {
        ...state,
        playerInformation: {
          ...state.playerInformation,
          ...action.payload,
        },
      };
    }

    /* ---------------------------- TOGGLE EQUIPMENT ---------------------------- */
    case "TOGGLE_EQUIPMENT": {
      const { itemId, slot } = action.payload;
      const currentlyEquipped = state.equipment?.[slot];

      const inventoryItem = state.inventory.find(
        (inventoryItem) => inventoryItem.id === itemId,
      );

      if (!inventoryItem || inventoryItem.quantity <= 0) {
        return state;
      }

      return {
        ...state,
        equipment: {
          ...state.equipment,
          [slot]: currentlyEquipped === itemId ? null : itemId,
        },
      };
    }

    /* -------------------------------- USE ITEM -------------------------------- */
    case "USE_ITEM": {
      const { itemId, effect } = action.payload;

      const inventoryItem = state.inventory.find(
        (inventoryItem) => inventoryItem.id === itemId,
      );

      if (!inventoryItem || inventoryItem.quantity <= 0) {
        return state;
      }

      let health = state.playerStatus.health;
      let mana = state.playerStatus.mana;

      if (effect.health) {
        health = Math.min(health + effect.health, state.playerStatus.maxHealth);
      }

      if (effect.mana) {
        mana = Math.min(mana + effect.mana, state.playerStatus.maxMana);
      }

      return {
        ...state,

        playerStatus: {
          ...state.playerStatus,
          health,
          mana,
        },

        inventory: state.inventory
          .map((inventoryItem) =>
            inventoryItem.id === itemId
              ? {
                  ...inventoryItem,
                  quantity: inventoryItem.quantity - 1,
                }
              : inventoryItem,
          )
          .filter((inventoryItem) => inventoryItem.quantity > 0),
      };
    }

    /* -------------------------------- BUY ITEM -------------------------------- */
    case "BUY_ITEM": {
      const { item, qty } = action.payload;

      const totalAmount = item.price.buy * qty;

      if (state.currency.coins < totalAmount) {
        return state;
      }

      const inventoryItem = state.inventory.find(
        (inventoryItem) => inventoryItem.id === item.id,
      );

      return {
        ...state,

        currency: {
          ...state.currency,
          coins: state.currency.coins - totalAmount,
        },

        inventory: inventoryItem
          ? state.inventory.map((inventoryItem) =>
              inventoryItem.id === item.id
                ? {
                    ...inventoryItem,
                    quantity: inventoryItem.quantity + qty,
                  }
                : inventoryItem,
            )
          : [
              ...state.inventory,
              {
                id: item.id,
                quantity: qty,
              },
            ],
      };
    }

    /* -------------------------------- SELL ITEM ------------------------------- */
    case "SELL_ITEM": {
      const { item, qty } = action.payload;

      const inventoryItem = state.inventory.find(
        (inventoryItem) => inventoryItem.id === item.id,
      );

      if (!inventoryItem) {
        return state;
      }

      if (inventoryItem.quantity < qty) {
        return state;
      }

      if (
        inventoryItem.id === state.equipment?.weapon &&
        inventoryItem.quantity - qty < 1
      ) {
        return state;
      }

      const totalAmount = item.price.sell * qty;

      return {
        ...state,

        currency: {
          ...state.currency,
          coins: state.currency.coins + totalAmount,
        },

        inventory: state.inventory
          .map((inventoryItem) =>
            inventoryItem.id === item.id
              ? {
                  ...inventoryItem,
                  quantity: inventoryItem.quantity - qty,
                }
              : inventoryItem,
          )
          .filter((inventoryItem) => inventoryItem.quantity > 0),
      };
    }
  }
}
