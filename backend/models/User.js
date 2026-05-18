import mongoose, { Schema } from "mongoose";

/* ------------------------------ PLAYER SCHEMA ----------------------------- */
const playerSchema = new mongoose.Schema({
  playerInformation: {
    username: { type: String, default: "Player_one" },
    title: {},
    class: {},
    avatar: {},
  },

  playerStatus: {
    health: {},
    maxHealth: {},
    armor: {},
    mana: {},
    maxMana: {},
  },

  playerLevel: {
    level: {},
    xp: {},
    xpToNextLevel: {},
  },

  playerStats: {
    str: {},
    agi: {},
    per: {},
    vit: {},
    int: {},
    fig: {},
  },

  currency: {
    coins: {},
    manaCrystals: {},
    raidKeys: {},
  },

  inventory: [],

  dailyQuests: {
    taskList: {},
    nextDailyReset: {},
  },

  mainObjectives: {
    taskList: {},
    nextWeeklyReset: {},
  },
});

/* ------------------------------- USER SCHEMA ------------------------------ */
const userSchema = new mongoose.Schema(
  {
    email: {},
    password: {},
    player: playerSchema,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
