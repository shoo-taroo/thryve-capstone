// --- Imports ---
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// --- App initialization ---
const app = express();
app.use(express.json());

// ✅ FIXED CORS CONFIGURATION
const allowedOrigins = [
  'https://thryve-web-tawny.vercel.app', // frontend (no trailing slash!)
  'http://localhost:5173', // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn('❌ Blocked by CORS:', origin);
        callback(new Error('CORS not allowed'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ✅ handle preflight requests globally
app.options('*', cors());

// 🧩 FILE UPLOAD CONFIGURATION
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // store inside backend/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

// ✅ Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const url = `${process.env.SERVER_URL || 'https://thryve-backend.vercel.app'}/uploads/${req.file.filename}`;
  res.json({ url });
});

// 🌿 ROUTES
const plantRoutes = require('./routes/plantRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/plants', plantRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// 🚀 START SERVER
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

module.exports = app;
