const Plant = require('../models/plantModel');

// GET all plants
exports.getPlants = async (req, res) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 });
    res.json(plants);
  } catch (err) {
    console.error("Error fetching plants:", err);
    res.status(500).json({ message: 'Server error while fetching plants' });
  }
};

// CREATE a new plant
exports.createPlant = async (req, res) => {
  try {
    const { name, scientificName, description, funFact, type } = req.body;
    let { sizes } = req.body;

    // Parse sizes if sent as JSON string
    if (typeof sizes === "string") {
      try {
        sizes = JSON.parse(sizes);
      } catch {
        return res.status(400).json({ message: "Invalid sizes format" });
      }
    }

    const imageUrl = req.file?.path || null;

    const plant = new Plant({
      name,
      scientificName,
      description,
      funFact,
      type,
      sizes,
      images: imageUrl ? [imageUrl] : []
    });

    await plant.save();
    res.status(201).json(plant);
  } catch (err) {
    console.error("Error creating plant:", err);
    res.status(400).json({ message: 'Invalid plant data', error: err.message });
  }
};

// UPDATE plant
exports.updatePlant = async (req, res) => {
  try {
    const { name, scientificName, description, funFact, type } = req.body;
    let { sizes } = req.body;

    if (typeof sizes === "string") {
      try {
        sizes = JSON.parse(sizes);
      } catch {
        return res.status(400).json({ message: "Invalid sizes format" });
      }
    }

    const imageUrl = req.file?.path || null;
    const existing = await Plant.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Plant not found' });

    existing.name = name;
    existing.scientificName = scientificName;
    existing.description = description;
    existing.funFact = funFact;
    existing.type = type;
    existing.sizes = sizes;
    existing.images = imageUrl ? [imageUrl] : existing.images;

    const updated = await existing.save();
    res.json(updated);
  } catch (err) {
    console.error("Error updating plant:", err);
    res.status(400).json({ message: 'Error updating plant', error: err.message });
  }
};

// DELETE plant
exports.deletePlant = async (req, res) => {
  try {
    await Plant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plant deleted successfully' });
  } catch (err) {
    console.error("Error deleting plant:", err);
    res.status(400).json({ message: 'Error deleting plant', error: err.message });
  }
};
