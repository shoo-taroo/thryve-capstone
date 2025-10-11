const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { uploadProducts } = require('../config/cloudinary'); // 👈 Import upload middleware

// Routes for Products
router.get('/', controller.getProducts);

// Create Product with image upload
router.post('/', uploadProducts.single('image'), controller.createProduct);

// Update Product (optionally with new image)
router.put('/:id', uploadProducts.single('image'), controller.updateProduct);

router.delete('/:id', controller.deleteProduct);

module.exports = router;
