// --- Imports ---
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const serverless = require("serverless-http");
require("dotenv").config();

// --- App initialization ---
const app = express();
app.use(express.json());

// ✅ SIMPLE CORS CONFIG — no manual headers, no preflight issues
app.use(
  cors({
    origin: [
      "https://thryve-web-tawny.vercel.app",
      "https://thryve-admin-omega.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// 🧩 File upload configuration (⚠ temporary path for Vercel)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "/tmp"), // Vercel temp dir
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "")),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

// --- File upload endpoint ---
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const url = `${
    process.env.SERVER_URL || "https://thryve-backend.vercel.app"
  }/uploads/${req.file.filename}`;
  res.json({ url });
});

// --- Routes ---
const plantRoutes = require("./routes/plantRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/plants", plantRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// --- Health Check ---
app.get("/", (req, res) => res.send("✅ Thryve Backend Active & Healthy"));

// --- MongoDB Connection ---
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("✅ MongoDB connected");
}
connectDB().catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Export handler for Vercel ---
module.exports = app;
module.exports.handler = serverless(app);
