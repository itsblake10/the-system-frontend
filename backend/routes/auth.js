/* -------------------------------------------------------------------------- */
/*                            AUTHENTICATION ROUTES                           */
/* -------------------------------------------------------------------------- */
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* --------------------------------- SIGNUP --------------------------------- */
router.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    //Existing User Check
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already used." });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already used." });
    }

    //Username Checks
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    if (username.length < 4 || username.length > 15) {
      return res
        .status(400)
        .json({ message: "Username must be between 4 and 15 characters." });
    }

    if (!/^[A-Za-z0-9_]+$/.test(username)) {
      return res.status(400).json({
        message: "Username may only contain letters, numbers and underscores.",
      });
    }

    //Email Checks
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address." });
    }

    //Password Checks
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      player: {
        playerInformation: {
          username,
        },
      },
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
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        player: user.player,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
});

export default router;
