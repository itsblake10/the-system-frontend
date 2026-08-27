import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";
import bcrypt from "bcrypt";
import { initialPlayerState } from "../../client/src/utils/initialPlayerState.js";
import { createAvatarUpload } from "../config/cloudinary.js";

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

/* --------------------------- CHANGE PLAYER TITLE -------------------------- */
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
router.patch("/reset", authMiddleware, async (req, res) => {
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
