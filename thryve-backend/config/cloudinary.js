const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// 🔹 Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Storage for Plants
const plantStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'plants',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

// 🔹 Storage for Products
const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

// 🔹 Create Multer upload middlewares
const uploadPlants = multer({ storage: plantStorage });
const uploadProducts = multer({ storage: productStorage });

module.exports = { cloudinary, uploadPlants, uploadProducts };
