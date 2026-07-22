import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rawgRouter } from './routes/rawg.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/rawg', rawgRouter);


app.get("/", (req, res) => {
  res.json({ message: "GameVault API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});