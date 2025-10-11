const Product = require('../models/productModel');

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

// CREATE a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, funFact, type, sizes } = req.body;

    const imageUrl = req.file ? req.file.path : null;

    const product = new Product({
      name,
      description,
      price,
      funFact,
      type,
      sizes,
      images: imageUrl ? [imageUrl] : []
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(400).json({ message: 'Invalid product data', error: err.message });
  }
};

// UPDATE a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, funFact, type, sizes } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const updateData = { name, description, price, category, funFact, type, sizes };
    if (imageUrl) updateData.images = [imageUrl];

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });

    res.json(updated);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(400).json({ message: 'Error updating product', error: err.message });
  }
};

// DELETE a product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(400).json({ message: 'Error deleting product', error: err.message });
  }
};
