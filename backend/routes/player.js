/* -------------------------------------------------------------------------- */
/*                                PLAYER ROUTES                               */
/* -------------------------------------------------------------------------- */
import express from "express";
import User from "../models/User.js";
import Item from "../models/Item.js";
import authMiddleware from "../middleware/auth.js";
import {
  applyXp,
  applyStats,
  applyCurrency,
  applyDamage,
} from "../utils/gameSystems.js";
import { getNextDailyReset, getNextWeeklyReset } from "../utils/dateResets.js";
import { createAvatarUpload } from "../config/cloudinary.js";

const router = express.Router();

/* ------------------------------- GET PLAYER ------------------------------- */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User no founnd" });
    }

    res.status(200).json(user.player);
  } catch (err) {
    res.status(500).json({
      message: "Failed to load player",
      error: err.message,
    });
  }
});

/* --------------------------- COMPLETE ONBOARDING -------------------------- */
router.post("/onboarding/complete", authMiddleware, async (req, res) => {
  try {
    const { mmaMode, dailyQuests, mainObjectives } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.player.onboarding = true;

    if (mmaMode !== undefined) {
      user.player.mmaMode = mmaMode;
    }

    if (dailyQuests !== undefined) {
      user.player.dailyQuests.taskList = dailyQuests.taskList;
    }

    if (mainObjectives !== undefined) {
      user.player.mainObjectives.taskList = mainObjectives.taskList;
    }

    await user.save();

    res.status(200).json(user.player);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to complete onboarding.",
      error: err.message,
    });
  }
});

/* ------------------------------- DAILY RESET ------------------------------ */
router.post("/resets/daily", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User no founnd" });
    }

    const now = new Date();
    const nextDailyReset = user.player.dailyQuests.nextDailyReset;

    if (!nextDailyReset || nextDailyReset > now) {
      return res.status(400).json({
        message: "Daily reset is not due yet.",
      });
    }

    user.player.dailyQuests.taskList = user.player.dailyQuests.taskList.map(
      (task) => {
        if (task.completed) {
          user.player.playerLevel = applyXp(
            user.player.playerLevel,
            task.reward?.xp || 0,
          );

          user.player.playerStats = applyStats(
            user.player.playerStats,
            task.reward?.stats || [],
          );

          user.player.currency = applyCurrency(
            user.player.currency,
            task.reward || {},
          );
        } else {
          user.player.playerStatus = applyDamage(
            user.player.playerStatus,
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

    user.player.dailyQuests.nextDailyReset = getNextDailyReset();

    await user.save();

    res.status(200).json(user.player);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to reset daily quests.",
      error: err.message,
    });
  }
});

/* ------------------------------ WEEKLY RESET ------------------------------ */
router.post("/resets/weekly", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const now = new Date();
    const nextWeeklyReset = user.player.mainObjectives.nextWeeklyReset;

    if (!nextWeeklyReset || nextWeeklyReset > now) {
      return res.status(400).json({
        message: "weekly reset is not due yet.",
      });
    }

    user.player.mainObjectives.taskList =
      user.player.mainObjectives.taskList.map((task) => {
        if (task.completed) {
          user.player.palyerLevel = applyXp(
            user.player.playerLevel,
            task.reward?.xp || 0,
          );

          user.player.playerStats = applyStats(
            user.player.playerStats,
            task.reward?.xp || 0,
          );
        }

        return {
          ...task,
          amount: 0,
          completed: false,
        };
      });

    user.player.mainObjectives.nextWeeklyReset = getNextWeeklyReset();

    await user.save();

    res.status(200).json(user.player);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to reset weekly objectives.",
      error: err.message,
    });
  }
});

/* ----------------------------- CHANGE USERNAME ---------------------------- */
router.patch("/username", authMiddleware, async (req, res) => {
  try {
    const { newUsername } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.player.playerInformation.username = newUsername;

    await user.save();

    res.status(200).json({
      username: user.player.playerInformation.username,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to change username",
      error: err.message,
    });
  }
});

/* ------------------------------ CHANGE TITLE ------------------------------ */
router.patch("/title", authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.player.playerInformation.title = title;

    await user.save();

    res.status(200).json({
      title: user.player.playerInformation.title,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to change title.",
      error: err.message,
    });
  }
});

/* ------------------------------ CHANGE AVATAR ----------------------------- */
router.patch("/avatar", authMiddleware, async (req, res) => {
  const upload = createAvatarUpload(req.userId);

  upload.single("avatar")(req, res, async (err) => {
    if (err) {
      console.log("MULTER/CLOUDINARY ERROR:", err);
      console.log("ERROR MESSAGE:", err.message);

      return res.status(500).json({
        message: "Upload failed",
        error: err.message,
      });
    }

    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      user.player.playerInformation.avatar = req.file.path;

      await user.save();

      res.status(200).json({
        avatar: user.player.playerInformation.avatar,
      });
    } catch (err) {
      res.status(500).json({
        message: "Failed to change avatar.",
        error: err.message,
      });
    }
  });
});

/* -------------------------- UPDATE GAME SETTINGS -------------------------- */
router.patch("/settings", authMiddleware, async (req, res) => {
  try {
    const { mmaMode, dailyQuests, mainObjectives } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (mmaMode !== undefined) {
      user.player.mmaMode = mmaMode;
    }

    if (dailyQuests !== undefined) {
      user.player.dailyQuests.taskList = dailyQuests.taskList;
    }

    if (mainObjectives !== undefined) {
      user.player.mainObjectives.taskList = mainObjectives.taskList;
    }

    await user.save();

    res.status(200).json(user.player);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update game settings.",
      error: err.message,
    });
  }
});

/* ----------------------- UPDATE DAILY QUEST PROGRESS ---------------------- */
router.post(
  "/daily-quests/:taskId/progress",
  authMiddleware,
  async (req, res) => {
    try {
      const { taskId } = req.params;
      const amount = Number(req.body.amount);

      if (!Number.isFinite(amount)) {
        return res.status(400).json({
          message: "Invalid quest progress amount.",
        });
      }

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const task = user.player.dailyQuests.taskList.find(
        (task) => task.id === taskId,
      );

      if (!task) {
        return res.status(404).json({
          message: "Daily quest not found",
        });
      }

      const clampedAmount = Math.max(0, Math.min(amount, Number(task.goal)));

      const updatedUser = await User.findOneAndUpdate(
        {
          _id: req.userId,
          "player.dailyQuests.taskList.id": taskId,
        },
        {
          $set: {
            "player.dailyQuests.taskList.$.amount": clampedAmount,
            "player.dailyQuests.taskList.$.completed":
              clampedAmount >= Number(task.goal),
          },
        },
        {
          returnDocument: "after",
          runValidators: true,
        },
      );

      if (!updatedUser) {
        return res.status(404).json({
          message: "Daily quest no longer exists.",
        });
      }

      return res.status(200).json(updatedUser.player);
    } catch (err) {
      console.error("Daily quest progress update failed:", err);

      return res.status(500).json({
        message: "Failed to update daily quest progress.",
        error: err.message,
      });
    }
  },
);

/* --------------------- UPDATE MAIN OBJECTIVE PROGRESS --------------------- */
router.post(
  "/main-objectives/:taskId/progress",
  authMiddleware,
  async (req, res) => {
    try {
      const { taskId } = req.params;
      const amount = Number(req.body.amount);

      if (!Number.isFinite(amount)) {
        return res.status(400).json({
          message: "Invalid objective progress amount.",
        });
      }

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const task = user.player.mainObjectives.taskList.find(
        (task) => task.id === taskId,
      );

      if (!task) {
        return res.status(404).json({
          message: "Main Objective not found",
        });
      }

      const clampedAmount = Math.max(0, Math.min(amount, Number(task.goal)));

      const updatedUser = await User.findOneAndUpdate(
        {
          _id: req.userId,
          "player.mainObjectives.taskList.id": taskId,
        },
        {
          $set: {
            "player.mainObjectives.taskList.$.amount": clampedAmount,
            "player.mainObjectives.taskList.$.completed":
              clampedAmount >= Number(task.goal),
          },
        },
        {
          returnDocument: "after",
          runValidators: true,
        },
      );

      if (!updatedUser) {
        return res.status(404).json({
          message: "Main Objective no longer exists.",
        });
      }

      return res.status(200).json(updatedUser.player);
    } catch (err) {
      console.error("Main objective progress update failed:", err);

      return res.status(500).json({
        message: "Failed to update main objective progress.",
        error: err.message,
      });
    }
  },
);

/* --------------------------- GET INVENTORY ITEMS -------------------------- */
router.get("/inventory/items", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const inventory = user.player.inventory;
    const itemIds = inventory.map((item) => item.id);

    const items = await Item.find({
      id: { $in: itemIds },
    });

    const inventoryItems = inventory
      .map((inventoryItem) => {
        const item = items.find((item) => item.id === inventoryItem.id);

        if (!item) {
          return null;
        }

        return {
          ...item.toObject(),
          quantity: inventoryItem.quantity,
        };
      })
      .filter(Boolean);

    res.status(200).json(inventoryItems);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load inventory items.",
      error: err.message,
    });
  }
});

/* --------------------------- USE INVENTORY ITEM --------------------------- */
router.post("/inventory/use", authMiddleware, async (req, res) => {
  try {
    const { itemId } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const inventoryItem = user.player.inventory.find(
      (item) => item.id === itemId,
    );

    if (!inventoryItem) {
      return res.status(404).json({
        message: "Item not found in inventory",
      });
    }

    if (inventoryItem.quantity <= 0) {
      return res.status(400).json({
        message: "Item has no remaining quantity",
      });
    }

    const item = await Item.findOne({ id: itemId });

    if (!item) {
      return res.status(404).json({
        message: "Item definition not found",
      });
    }

    if (item.effect?.health !== undefined) {
      user.player.playerStatus.health = Math.min(
        user.player.playerStatus.health + item.effect.health,
        user.player.playerStatus.maxHealth,
      );
    }

    if (item.effect?.mana !== undefined) {
      user.player.playerStatus.mana = Math.min(
        user.player.playerStatus.mana + item.effect.mana,
        user.player.playerStatus.maxMana,
      );
    }

    if (item.effect?.armor !== undefined) {
      user.player.playerStatus.armor = Math.min(
        user.player.playerStatus.armor + item.effect.armor,
        user.player.playerStatus.maxArmor,
      );
    }

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
      message: "Failed to use inventory item.",
      error: err.message,
    });
  }
});

/* ---------------------------- TOGGLE EQUIPMENT ---------------------------- */
router.post("/inventory/toggle-equipment", authMiddleware, async (req, res) => {
  try {
    const { itemId } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const inventoryItem = user.player.inventory.find(
      (item) => item.id === itemId,
    );

    if (!inventoryItem) {
      return res.status(404).json({
        message: "Item not found in inventory",
      });
    }

    const item = await Item.findOne({ id: itemId });

    if (!item) {
      return res.status(404).json({
        message: "Item definition not found",
      });
    }

    if (item.itemType !== "Weapon") {
      return res.status(400).json({
        message: "This item cannot be equipped.",
      });
    }

    if (user.player.equipment.weapon === itemId) {
      user.player.equipment.weapon = null;
    } else {
      user.player.equipment.weapon = itemId;
    }

    await user.save();

    res.status(200).json(user.player);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to toggle equipment.",
      error: err.message,
    });
  }
});

export default router;
