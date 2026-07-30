import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from './middleware/logger.js';
import { rawgRouter } from './routes/rawg.js';
import connectDB from "./config/db.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/api/rawg', rawgRouter);


app.get("/", (req, res) => {
  res.json({ message: "GameVault API is running!" });
});

// teamates add their own line here as routes are built
// app.use ("/api/auth", authRoutes);
// app.user ("/api/games", gameRoutes);
// (for example)
app.use("/api/favorites", favoriteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});