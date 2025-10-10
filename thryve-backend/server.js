// --- Imports ---
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const serverless = require('serverless-http');
require('dotenv').config();

// --- App initialization ---
const app = express();
app.use(express.json());

// ✅ CORS: Allow frontend domains
const allowedOrigins = [
  'https://thryve-web-tawny.vercel.app',
  'https://thryve-admin-omega.vercel.app',
  'http://localhost:5173',
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// 🧩 File upload configuration (⚠ Note: temporary on Vercel)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '/tmp'), // temporary directory
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '')),
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// --- File upload endpoint ---
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const url = `${process.env.SERVER_URL || 'https://thryve-backend.vercel.app'}/uploads/${req.file.filename}`;
  res.json({ url });
});

// --- Routes ---
const plantRoutes = require('./routes/plantRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/plants', plantRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// --- Health Check ---
app.get('/', (req, res) => res.send('✅ Thryve Backend Active & Healthy'));

// --- MongoDB (serverless-safe connection) ---
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log('✅ MongoDB connected');
}
connectDB().catch((err) => console.error('❌ MongoDB connection error:', err));

// --- Export handler for Vercel ---
module.exports = app;
module.exports.handler = serverless(app);
