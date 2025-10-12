const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// 🔹 Configure Cloudinary using environment variables
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 🔹 Create unique filename
const uniqueFileName = (file) => {
  const timestamp = Date.now();
  const name = file.originalname.split('.')[0].replace(/\s+/g, '_');
  return `${name}_${timestamp}`;
};

// 🔹 Storage for Plants
const plantStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'plants',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => uniqueFileName(file),
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

// 🔹 Storage for Products
const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => uniqueFileName(file),
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

// 🔹 Create Multer upload middlewares
const uploadPlants = multer({ storage: plantStorage });
const uploadProducts = multer({ storage: productStorage });

module.exports = { cloudinary, uploadPlants, uploadProducts };
