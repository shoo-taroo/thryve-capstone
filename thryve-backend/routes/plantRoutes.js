const express = require('express');
const router = express.Router();
const controller = require('../controllers/plantController');
const { uploadPlants } = require('../config/cloudinary'); // 👈 Import upload middleware

// Routes for Plants
router.get('/', controller.getPlants);

// Create Plant with image upload
router.post('/', uploadPlants.single('image'), controller.createPlant);

// Update Plant (optionally with new image)
router.put('/:id', uploadPlants.single('image'), controller.updatePlant);

router.delete('/:id', controller.deletePlant);

module.exports = router;
