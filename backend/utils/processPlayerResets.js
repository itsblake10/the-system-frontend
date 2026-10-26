/* -------------------------------------------------------------------------- */
/*                            PROCESS PLAYER RESETS                           */
/* -------------------------------------------------------------------------- */

import mongoose from "mongoose";
import User from "../models/User.js";

import {
  applyXp,
  applyStats,
  applyCurrency,
  applyDamage,
} from "./gameSystems.js";

import {
  advanceDailyReset,
  advanceWeeklyReset,
  getNextDailyReset,
  getNextWeeklyReset,
} from "./dateResets.js";

/* ---------------------------- VALIDATE TIMEZONE --------------------------- */

const isValidTimeZone = (timeZone) => {
  if (typeof timeZone !== "string" || !timeZone.trim()) {
    return false;
  }

  try {
    new Intl.DateTimeFormat("en", { timeZone });
    return true;
  } catch {
    return false;
  }
};

/* -------------------------- PROCESS PLAYER RESETS ------------------------- */

export async function processPlayerResets(userId, requestedTimeZone) {
  const session = await mongoose.startSession();

  let updatedPlayer;

  try {
    await session.withTransaction(async () => {
      const user = await User.findById(userId).session(session);

      if (!user) {
        throw new Error("User not found");
      }

      const player = user.player;

      let changed = false;

      /* ----------------------------- TIMEZONE ----------------------------- */

      if (isValidTimeZone(requestedTimeZone)) {
        if (player.timeZone !== requestedTimeZone) {
          player.timeZone = requestedTimeZone;
          changed = true;
        }
      }

      const timeZone = isValidTimeZone(player.timeZone)
        ? player.timeZone
        : "UTC";

      const now = new Date();

      /* --------------------------- INITIALIZE DATES ------------------------ */

      if (!player.dailyQuests.nextDailyReset) {
        player.dailyQuests.nextDailyReset = getNextDailyReset(timeZone);
        changed = true;
      }

      if (!player.mainObjectives.nextWeeklyReset) {
        player.mainObjectives.nextWeeklyReset = getNextWeeklyReset(timeZone);
        changed = true;
      }

      /* ------------------------------- DAILY RESET ------------------------ */

      let nextDailyReset = new Date(player.dailyQuests.nextDailyReset);

      let dailyChanged = false;

      while (nextDailyReset <= now) {
        player.dailyQuests.taskList = player.dailyQuests.taskList.map(
          (task) => {
            if (task.completed) {
              player.playerLevel = applyXp(
                player.playerLevel,
                task.reward?.xp || 0,
              );

              player.playerStats = applyStats(
                player.playerStats,
                task.reward?.stats || [],
              );

              player.currency = applyCurrency(
                player.currency,
                task.reward || {},
              );
            } else {
              player.playerStatus = applyDamage(
                player.playerStatus,
                task.penalty || 0,
              );
            }

            return {
              ...task,
              amount: 0,
              completed: false,
            };
          },
        );

        nextDailyReset = advanceDailyReset(nextDailyReset, timeZone);

        dailyChanged = true;
        changed = true;
      }

      if (dailyChanged) {
        player.dailyQuests.nextDailyReset = nextDailyReset;
      }

      /* ------------------------------ WEEKLY RESET ------------------------- */

      let nextWeeklyReset = new Date(player.mainObjectives.nextWeeklyReset);

      let weeklyChanged = false;

      while (nextWeeklyReset <= now) {
        player.mainObjectives.taskList = player.mainObjectives.taskList.map(
          (task) => {
            if (task.completed) {
              player.playerLevel = applyXp(
                player.playerLevel,
                task.reward?.xp || 0,
              );

              player.playerStats = applyStats(
                player.playerStats,
                task.reward?.stats || [],
              );
            }

            return {
              ...task,
              amount: 0,
              completed: false,
            };
          },
        );

        nextWeeklyReset = advanceWeeklyReset(nextWeeklyReset, timeZone);

        weeklyChanged = true;
        changed = true;
      }

      if (weeklyChanged) {
        player.mainObjectives.nextWeeklyReset = nextWeeklyReset;
      }

      /* -------------------------------- SAVE ------------------------------- */

      if (changed) {
        user.markModified("player.dailyQuests.taskList");
        user.markModified("player.mainObjectives.taskList");

        user.markModified("player.dailyQuests.nextDailyReset");
        user.markModified("player.mainObjectives.nextWeeklyReset");

        user.markModified("player.playerLevel");
        user.markModified("player.playerStats");
        user.markModified("player.currency");
        user.markModified("player.playerStatus");
        user.markModified("player.timeZone");

        await user.save({ session });
      }

      updatedPlayer = user.player;
    });

    return updatedPlayer;
  } finally {
    await session.endSession();
  }
}
