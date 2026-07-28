import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./config/db.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import { rawgRouter } from './routes/rawg.js';
import authRoutes from "./routes/authRoutes.js";

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
//auth 
app.use('/api/auth', authRoutes);


app.use('/api/rawg', rawgRouter);
app.use("/api/favorites", favoriteRoutes);

app.get("/", (req, res) => {
  res.json({ message: "GameVault API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});