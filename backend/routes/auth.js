import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* --------------------------------- SIGNUP --------------------------------- */
router.post("/signup", async (req, res) => {
  try {
    const { email, password, player } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      player,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

/* ---------------------------------- LOGIN --------------------------------- */
//future

/* -------------------------------- GET USER -------------------------------- */
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

export default router;
