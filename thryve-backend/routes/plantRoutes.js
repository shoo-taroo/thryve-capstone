// routes/plants.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/plantController');

router.get('/', controller.getPlants);
router.post('/', controller.createPlant);
router.put('/:id', controller.updatePlant);
router.delete('/:id', controller.deletePlant);

module.exports = router;
