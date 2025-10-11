const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  size: String,
  price: Number
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  funFact: String,
  type: String,
  sizes: [sizeSchema],
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
