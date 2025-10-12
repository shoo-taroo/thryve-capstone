// --- Imports ---
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
require("dotenv").config();

// --- App initialization ---
const app = express();

// ✅ Parse JSON and URL-encoded bodies (important for Vercel serverless)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ CORS: Allow frontend domains
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

app.use((err, req, res, next) => {
  console.error('🔥 Global error caught:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message || err,
  });
});
