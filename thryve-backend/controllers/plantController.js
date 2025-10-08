const Plant = require('../models/plantModel');

exports.getPlants = async (req, res) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 });
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPlant = async (req, res) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.status(201).json(plant);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', err });
  }
};

exports.updatePlant = async (req, res) => {
  try {
    const updated = await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
  }
};

exports.deletePlant = async (req, res) => {
  try {
    await Plant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Delete failed' });
  }
};
