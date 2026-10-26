/* -------------------------------------------------------------------------- */
/*                           QUEST/OBJECTIVE ROUTES                           */
/* -------------------------------------------------------------------------- */
import express from "express";
import { dailyQuests } from "../utils/dailyQuests.js";
import { mainObjectives } from "../utils/mainObjectives.js";

const router = express.Router();

/* ---------------------------- GET DAILY QUESTS ---------------------------- */
router.get("/daily-quests", (req, res) => {
  try {
    res.status(200).json(dailyQuests);
  } catch (err) {
    console.error("Failed to load daily quests:", err);

    res.status(500).json({
      message: "Failed to load daily quests",
    });
  }
});

/* --------------------------- GET MAIN OBJECTIVES -------------------------- */
router.get("/main-objectives", (req, res) => {
  try {
    res.status(200).json(mainObjectives);
  } catch (err) {
    console.error("Failed to load main objectives:", err);

    res.status(500).json({
      message: "Failed to load main objectives",
    });
  }
});

export default router;
