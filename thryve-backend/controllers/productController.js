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
    const { name, description, funFact, type, sizes } = req.body;
    const imageUrl = req.file?.path || null;

    // parse sizes if it was sent as JSON string
    let parsedSizes = [];
    if (typeof sizes === 'string' && sizes.trim()) {
      parsedSizes = JSON.parse(sizes);
    } else if (Array.isArray(sizes)) {
      parsedSizes = sizes;
    }

    const normalizedSizes = parsedSizes.map(s => ({
      size: s.size ?? s.label ?? '',
      price: Number(s.price) || 0
    }));

    const product = new Product({
      name,
      description,
      funFact,
      type,
      sizes: normalizedSizes,
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
    console.log('updateProduct req.file:', req.file);
    console.log('updateProduct req.body:', req.body);
    
    const { name, description, funFact, type, sizes } = req.body;
        const imageUrl = req.file?.path || null;

        const existing = await Product.findById(req.params.id);
        if (!existing) return res.status(404).json({ message: 'Product not found' });
    
        let parsedSizes = [];
        if (typeof sizes === 'string' && sizes.trim()) parsedSizes = JSON.parse(sizes);
        else if (Array.isArray(sizes)) parsedSizes = sizes;
    
        const normalizedSizes = parsedSizes.map(s => ({ size: s.size ?? '', price: Number(s.price) || 0 }));

    existing.name = name;
    existing.description = description;
    existing.funFact = funFact;
    existing.type = type;
    existing.sizes = normalizedSizes;
    existing.images = imageUrl ? [imageUrl] : existing.images;

    const updated = await existing.save();
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
