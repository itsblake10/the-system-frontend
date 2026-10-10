/* -------------------------------------------------------------------------- */
/*                                 ITEM SCHEMA                                */
/* -------------------------------------------------------------------------- */
import mongoose from "mongoose";

/* ------------------------------- ITEM SCHEMA ------------------------------ */
const itemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  itemType: { type: String, required: true },
  weaponType: { type: String },
  rarity: { type: String },
  effect: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  price: {
    buy: {
      type: Number,
    },
    sell: {
      type: Number,
    },
  },

  level: { type: Number },
  description: { type: String, required: true },
  image: {
    type: String,
  },
});

export default mongoose.model("Item", itemSchema);
