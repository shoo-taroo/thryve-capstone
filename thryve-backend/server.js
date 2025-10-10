// --- Imports ---
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// --- App initialization ---
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      'https://thryve-admin-omega.vercel.app', // frontend domain (deployed)
      'http://localhost:5173', // local dev
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// --- Cloudinary Configuration ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Cloudinary Storage Setup ---
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'thryve_uploads', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

const upload = multer({ storage });

// --- Upload Endpoint ---
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Cloudinary automatically returns a secure HTTPS URL
    res.json({ url: req.file.path });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// --- Routes ---
const plantRoutes = require('./routes/plantRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/plants', plantRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

module.exports = app;
