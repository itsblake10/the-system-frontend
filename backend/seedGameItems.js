/* -------------------------------------------------------------------------- */
/*                         SEED GAME ITEMS TO MONGODB                         */
/* -------------------------------------------------------------------------- */
import mongoose from "mongoose";
import Item from "./models/Item.js";
import { gameItems } from "./utils/gameItems.js";
import "dotenv/config";

const seedItems = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    for (const item of gameItems) {
      await Item.updateOne({ id: item.id }, { $set: item }, { upsert: true });
    }

    console.log(`Seeded ${gameItems.length} items`);

    await mongoose.disconnect();

    console.log("MongoDB connection closed");
  } catch (err) {
    console.error("Failed to seed items:", err);
    process.exit(1);
  }
};

seedItems();
