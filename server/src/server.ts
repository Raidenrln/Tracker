import express from "express";
import crypto from "crypto";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { db } from "./config/db.js";
import type { RowDataPacket } from "mysql2";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Global Middleware
app.use(cors());
app.use(express.json());

// Helper function to check AuthMe passwords
const verifyAuthMePassword = (enteredPassword: string, storedRecord: string): boolean => {
  const parts = storedRecord.split("$");

  if (parts.length !== 4 || parts[1] !== "SHA") {
    return false; // Not a valid AuthMe SHA string
  }

  const salt = parts[2];
  const expectedHash = parts[3];

  if (!salt || !expectedHash) {
    return false;
  }

  // AuthMe Algorithm: double SHA256 with salt attached
  const firstPass = crypto.createHash("sha256").update(enteredPassword).digest("hex");

  const finalHash = crypto
    .createHash("sha256")
    .update(firstPass + salt)
    .digest("hex");

  const finalBuffer = Buffer.from(finalHash, "hex");
  const expectedBuffer = Buffer.from(expectedHash, "hex");

  // Prevent timing attack/crash if length differs
  if (finalBuffer.length !== expectedBuffer.length) {
    return false;
  }

  // Safe constant-time string comparison
  return crypto.timingSafeEqual(finalBuffer, expectedBuffer);
};

// ----------------------------------------------------
// LOGIN ENDPOINT
// ----------------------------------------------------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id, username, password FROM authme WHERE username = ?",
      [username],
    );

    const user = rows[0];

    // Guard check for invalid username or missing password record
    if (!user || typeof user.password !== "string") {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isValid = verifyAuthMePassword(password, user.password);

    if (isValid) {
      const token = jwt.sign(
        { id: user.id, username: user.username},
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      )
      return res.status(200).json({ message: "Login successful!", token });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Database query error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Start the Express server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
