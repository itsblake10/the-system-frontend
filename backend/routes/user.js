import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";
import bcrypt from "bcrypt";
import { initialPlayerState } from "../utils/initialPlayerState.js";

const router = express.Router();

/* -------------------------------- GET USER -------------------------------- */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("email");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Failed to load user",
      error: err.message,
    });
  }
});

/* ------------------------------ CHANGE EMAIL ------------------------------ */
router.patch("/email", authMiddleware, async (req, res) => {
  try {
    const { newEmail, password } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Incorrect password.",
      });
    }

    user.email = newEmail;

    await user.save();

    res.status(200).json({
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to change email.",
      error: err.message,
    });
  }
});

/* ----------------------------- CHANGE PASSWORD ---------------------------- */
router.patch("/password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(currentPassword, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Incorrect password.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.status(200).json({
      message: "Password updated",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to change password.",
      error: err.message,
    });
  }
});

/* ----------------------------- DELETE ACCOUNT ----------------------------- */
router.delete("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Account deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete account.",
      error: err.message,
    });
  }
});

/* ------------------------------ RESET ACCOUNT ----------------------------- */
router.post("/reset", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const username = user.player.playerInformation.username;

    const resetPlayer = initialPlayerState;

    user.player = {
      ...resetPlayer,

      playerInformation: {
        ...resetPlayer.playerInformation,
        username,
      },
    };

    await user.save();

    res.status(200).json(user.player);
  } catch (err) {
    res.status(500).json({
      message: "Failed to reset account.",
      error: err.message,
    });
  }
});

export default router;
