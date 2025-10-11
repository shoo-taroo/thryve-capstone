const express = require('express');
const router = express.Router();
const controller = require('../controllers/plantController');
const { uploadPlants } = require('../config/cloudinary');

// Routes for Plants
router.get('/', controller.getPlants);
router.post('/', uploadPlants.single('image'), controller.createPlant);
router.put('/:id', uploadPlants.single('image'), controller.updatePlant);
router.delete('/:id', controller.deletePlant);

module.exports = router;
