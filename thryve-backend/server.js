const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// ✅ CORS FIX — explicitly handle allowed origins and preflight
const allowedOrigins = [
  'https://thryve-web-tawny.vercel.app',
  'http://localhost:5173', // for local development
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', 'true');

  // ✅ Respond immediately to preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 🧩 File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const url = `${process.env.SERVER_URL || 'https://thryve-backend.vercel.app'}/uploads/${req.file.filename}`;
  res.json({ url });
});

// 🌿 Routes
const plantRoutes = require('./routes/plantRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/plants', plantRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// ✅ Root route for quick health check
app.get('/', (req, res) => res.send('🌿 Thryve Backend Running...'));

// 🚀 MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

module.exports = app;
