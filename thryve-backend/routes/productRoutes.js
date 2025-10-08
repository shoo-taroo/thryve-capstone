const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

// Routes for CRUD operations
router.get('/', controller.getProducts);      // Fetch all products
router.post('/', controller.createProduct);   // Add new product
router.put('/:id', controller.updateProduct); // Edit product
router.delete('/:id', controller.deleteProduct); // Delete product

module.exports = router;
