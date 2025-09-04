import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import register from "./route/AuthRouter.js";
import login from "./route/AuthRouter.js"
import "./db/index.js";

import ProfileRoutes from "./route/ProfileRoutes.js"

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  // origin: ["http://localhost:5173", "http://localhost:3000"],
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Routes
app.get("/", (req, res) => {
  res.send("✅ Archvid Backend is running");
});


app.use("/auth", register);

app.use("/auth", login )

app.use("/api/profile", ProfileRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Backend error:", err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
