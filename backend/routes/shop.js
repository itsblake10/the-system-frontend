/* -------------------------------------------------------------------------- */
/*                                 SHOP ROUTES                                */
/* -------------------------------------------------------------------------- */
import express from "express";
import Item from "../models/Item.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/* ----------------------------- GET SHOP ITEMS ----------------------------- */
router.get("/items", async (req, res) => {
  try {
    const shopItems = await Item.find({
      "price.buy": { $exists: true },
    });

    res.status(200).json(shopItems);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load shop items.",
      error: err.message,
    });
  }
});

/* ------------------------------ BUY SHOP ITEM ----------------------------- */
router.post("/buy", authMiddleware, async (req, res) => {
  try {
    const { itemId } = req.body;

    const item = await Item.findOne({ id: itemId });

    if (!item) {
      return res.status(404).json({
        message: "Item not found.",
      });
    }

    if (item.price?.buy == null) {
      return res.status(400).json({
        message: "This item cannot be purchased.",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (user.player.currency.coins < item.price.buy) {
      return res.status(400).json({
        message: "Not enough coins.",
      });
    }

    user.player.currency.coins -= item.price.buy;

    const inventoryItem = user.player.inventory.find(
      (inventoryItem) => inventoryItem.id === itemId,
    );

    if (inventoryItem) {
      inventoryItem.quantity += 1;
    } else {
      user.player.inventory.push({
        id: itemId,
        quantity: 1,
      });
    }

    await user.save();

    res.status(200).json(user.player);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to buy item.",
      error: err.message,
    });
  }
});

/* ------------------------------ SELL SHOP ITEM ----------------------------- */
router.post("/sell", authMiddleware, async (req, res) => {
  try {
    const { itemId } = req.body;

    const item = await Item.findOne({ id: itemId });

    if (!item) {
      return res.status(404).json({
        message: "Item not found.",
      });
    }

    if (item.price?.sell == null) {
      return res.status(400).json({
        message: "This item cannot be sold.",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const inventoryItem = user.player.inventory.find(
      (inventoryItem) => inventoryItem.id === itemId,
    );

    if (!inventoryItem || inventoryItem.quantity <= 0) {
      return res.status(400).json({
        message: "You do not own this item.",
      });
    }

    user.player.currency.coins += item.price.sell;

    inventoryItem.quantity -= 1;

    if (inventoryItem.quantity <= 0) {
      user.player.inventory = user.player.inventory.filter(
        (item) => item.id !== itemId,
      );
    }

    await user.save();

    res.status(200).json(user.player);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to sell item.",
      error: err.message,
    });
  }
});

export default router;
