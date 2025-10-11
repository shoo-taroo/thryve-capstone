// --- Imports ---
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const serverless = require("serverless-http");
require("dotenv").config();

// Cloudinary & Multer
const { cloudinary } = require("./config/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

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

// --- Cloudinary Storage ---
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "uploads", // Default folder (can be "plants" or "products" in routes)
      allowed_formats: ["jpg", "png", "jpeg"],
      public_id: Date.now() + "-" + file.originalname.replace(/\s/g, ""),
    };
  },
});

const upload = multer({ storage });

// --- File upload endpoint (generic) ---
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  // Cloudinary gives back a secure URL
  res.json({ url: req.file.path });
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
