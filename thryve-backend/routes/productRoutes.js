const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { uploadProducts } = require('../config/cloudinary');

// Routes for Products
router.get('/', controller.getProducts);
router.post('/', (req, res, next) => {
    uploadProducts.single('image')(req, res, function (err) {
        if (err) {
            console.error('💥 Multer/Cloudinary upload error:', err);
            return res.status(400).json({
                message: 'Upload error',
                error: err.message || err,
            });
        }
        next();
    });
}, controller.createProduct);
router.put('/:id', (req, res, next) => {
    uploadProducts.single('image')(req, res, function (err) {
        if (err) {
            console.error('💥 Multer/Cloudinary upload error:', err);
            return res.status(400).json({
                message: 'Upload error',
                error: err.message || err,
            });
        }
        next();
    });
}, controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
