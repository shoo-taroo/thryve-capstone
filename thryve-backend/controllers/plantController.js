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
    console.log("Cloudinary upload result:", req.file);
    const { name, scientificName, description, funFact, type, sizes } = req.body;
    const imageUrl = req.file?.path || req.file?.secure_url || null;

    // parse sizes if it was sent as JSON string
    let parsedSizes = [];
    if (typeof sizes === 'string' && sizes.trim()) {
      parsedSizes = JSON.parse(sizes);
    } else if (Array.isArray(sizes)) {
      parsedSizes = sizes;
    }

    const normalizedSizes = parsedSizes.map(s => ({
      size: s.size ?? '',
      price: Number(s.price) || 0
    }));

    const plant = new Plant({
      name,
      scientificName,
      description,
      funFact,
      type,
      sizes: normalizedSizes,
      images: imageUrl ? [imageUrl] : [],
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
    console.log('updatePlant req.file:', req.file);
    console.log('updatePlant req.body:', req.body);

    const { name, scientificName, description, funFact, type, sizes } = req.body;
    const imageUrl = req.file?.path?.startsWith('http')
      ? req.file.path
      : req.file?.secure_url
        ? req.file.secure_url
        : (req.file && req.file.url)
          ? req.file.url
          : null;


    const existing = await Plant.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Plant not found' });

    let parsedSizes = [];
    if (typeof sizes === 'string' && sizes.trim()) parsedSizes = JSON.parse(sizes);
    else if (Array.isArray(sizes)) parsedSizes = sizes;

    const normalizedSizes = parsedSizes.map(s => ({ size: s.size ?? '', price: Number(s.price) || 0 }));

    existing.name = name;
    existing.scientificName = scientificName;
    existing.description = description;
    existing.funFact = funFact;
    existing.type = type;
    existing.sizes = normalizedSizes;
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
