/* -------------------------------------------------------------------------- */
/*                                PLAYER ROUTES                               */
/* -------------------------------------------------------------------------- */
import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/* ------------------------------- GET PLAYER ------------------------------- */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user.player);
  } catch (err) {
    res.status(500).json({
      message: "Failed to load player",
      error: err.message,
    });
  }
});

/* ------------------------------- SAVE PLAYER ------------------------------ */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { player: req.body },
      { new: true },
    );

    res.status(200).json(updatedUser.player);
  } catch (err) {
    res.status(500).json({
      message: "Failed to save player",
      error: err.message,
    });
  }
});

export default router;
