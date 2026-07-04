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

/* ------------------------------- SAVE PLAYER ------------------------------ */
router.patch("/", authMiddleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          player: req.body,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser.player);
  } catch (err) {
    res.status(500).json({
      message: "Failed to save player",
      error: err.message,
    });
  }
});

/* ------------------------------- ONBOARDING ------------------------------- */
// router.put("/onboarding", authMiddleware, async (req, res) => {
//   console.log(req.body);
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.userId,
//       {
//         $set: {
//           "player.onboarding": req.body.onboarding,
//           "player.mmaMode": req.body.mmaMode,
//           "player.dailyQuests": req.body.dailyQuests,
//           "player.mainObjectives": req.body.mainObjectives,
//         },
//       },
//       {
//         new: true,
//         runValidators: true,
//       },
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(updatedUser.player);
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to save player",
//       error: err.message,
//     });
//   }
// });

export default router;
