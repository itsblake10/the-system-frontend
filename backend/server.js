import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import playerRoutes from "./routes/player.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

/* ---------------------------- MIDDLEWARE SETUP ---------------------------- */
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/player", playerRoutes);

/* ------------------------------- TEST ROUTE ------------------------------- */
app.get("/", (req, res) => {
  res.send("API RUNNING!");
});

/* ------------------------------- CONNECT DB ------------------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB CONNECTED!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB CONNECTION FAILED:", err);
  });
