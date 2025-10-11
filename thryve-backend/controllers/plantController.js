const Plant = require('../models/plantModel');

// GET all plants
exports.getPlants = async (req, res) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 });
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE a new plant
exports.createPlant = async (req, res) => {
  try {
    const { name, scientificName, description, funFact, type, sizes } = req.body;

    // If image uploaded via Cloudinary
    const imageUrl = req.file ? req.file.path : null;

    const plant = new Plant({
      name,
      scientificName,
      description,
      funFact,
      type,
      sizes,
      images: imageUrl ? [imageUrl] : [] // Store Cloudinary URL
    });

    await plant.save();
    res.status(201).json(plant);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
};

// UPDATE plant
exports.updatePlant = async (req, res) => {
  try {
    const { name, scientificName, description, funFact, type, sizes } = req.body;

    // If a new image was uploaded
    const imageUrl = req.file ? req.file.path : null;

    const updateData = {
      name,
      scientificName,
      description,
      funFact,
      type,
      sizes
    };

    if (imageUrl) {
      updateData.images = [imageUrl]; // Replace existing images with new one
    }

    const updated = await Plant.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) return res.status(404).json({ message: 'Plant not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
};

// DELETE plant
exports.deletePlant = async (req, res) => {
  try {
    await Plant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Delete failed', error: err.message });
  }
};
