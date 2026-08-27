/* -------------------------------------------------------------------------- */
/*                             USER/PLAYER SCHEMAS                            */
/* -------------------------------------------------------------------------- */
import mongoose, { Schema } from "mongoose";
import { getNextDailyReset, getNextWeeklyReset } from "../utils/dateResets.js";

/* ------------------------------ PLAYER SCHEMA ----------------------------- */
const playerSchema = new mongoose.Schema({
  onboarding: { type: Boolean, default: false },

  mmaMode: { type: Boolean, default: false },

  playerInformation: {
    username: {
      type: String,
      required: true,
      default: "",
      minlength: 4,
      maxlength: 15,
      match: /^[A-Za-z0-9_]+$/,
      unique: true,
    },
    title: { type: String, default: "Unassigned" },
    class: { type: String, default: "New Recruit" },
    avatar: { type: String, default: "" },
  },

  playerStatus: {
    health: { type: Number, default: 1000 },
    maxHealth: { type: Number, default: 1000 },
    armor: { type: Number, default: 0 },
    mana: { type: Number, default: 0 },
    maxMana: { type: Number, default: 500 },
  },

  playerLevel: {
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    xpToNextLevel: { type: Number, default: 1000 },
  },

  playerStats: {
    STR: { type: Number, default: 0 },
    AGI: { type: Number, default: 0 },
    PER: { type: Number, default: 0 },
    VIT: { type: Number, default: 0 },
    INT: { type: Number, default: 0 },
    FIG: { type: Number, default: 0 },
  },

  currency: {
    coins: { type: Number, default: 0 },
    manaCrystals: { type: Number, default: 0 },
    raidKeys: { type: Number, default: 0 },
  },

  inventory: {
    type: [
      {
        id: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [
      {
        id: "wk1",
        quantity: 1,
      },
      {
        id: "c1",
        quantity: 1,
      },
    ],
  },

  equipment: {
    weapon: {
      type: String,
      default: null,
    },
    armor: {
      type: String,
      default: null,
    },
  },

  playerTitles: {
    type: [String],
    default: ["Unassigned", "Novice"],
  },

  dailyQuests: {
    taskList: { type: Array, default: [] },
    nextDailyReset: {
      type: Date,
      default: getNextDailyReset,
    },
  },

  mainObjectives: {
    taskList: { type: Array, default: [] },
    nextWeeklyReset: {
      type: Date,
      default: getNextWeeklyReset,
    },
  },
});

/* ------------------------------- USER SCHEMA ------------------------------ */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    player: playerSchema,
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
