import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http:/localhost:${PORT}`);
});
