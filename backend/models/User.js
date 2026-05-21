/* -------------------------------------------------------------------------- */
/*                             USER/PLAYER SCHEMAS                            */
/* -------------------------------------------------------------------------- */
import mongoose, { Schema } from "mongoose";

/* ------------------------------ PLAYER SCHEMA ----------------------------- */
const playerSchema = new mongoose.Schema({
  playerInformation: {
    username: { type: String, default: "Player_one" },
    title: { type: String, default: "Unassigned" },
    class: { type: String, default: "Unassigned" },
    avatar: { type: String, default: "" },
  },

  playerStatus: {
    health: { type: Number, default: 1000 },
    maxHealth: { type: Number, default: 1000 },
    armor: { type: Number, default: 0 },
    mana: { type: Number, default: 0 },
    maxMana: { type: Number, default: 50 },
  },

  playerLevel: {
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    xpToNextLevel: { type: Number, default: 1000 },
  },

  playerStats: {
    str: { type: Number, default: 0 },
    agi: { type: Number, default: 0 },
    per: { type: Number, default: 0 },
    vit: { type: Number, default: 0 },
    int: { type: Number, default: 0 },
    fig: { type: Number, default: 0 },
  },

  currency: {
    coins: { type: Number, default: 0 },
    manaCrystals: { type: Number, default: 0 },
    raidKeys: { type: Number, default: 0 },
  },

  //   inventory: [],

  dailyQuests: {
    taskList: { type: Array, default: [] },
    nextDailyReset: { type: Date },
  },

  mainObjectives: {
    taskList: { type: Array, default: [] },
    nextWeeklyReset: { type: Date },
  },
});

/* ------------------------------- USER SCHEMA ------------------------------ */
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    player: playerSchema,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
