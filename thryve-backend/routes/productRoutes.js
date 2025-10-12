const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { uploadProducts } = require('../config/cloudinary');

// Routes for Products
router.get('/', controller.getProducts);
router.post('/', uploadProducts.single('image'), controller.createProduct);
router.put('/:id', uploadProducts.single('image'), controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
