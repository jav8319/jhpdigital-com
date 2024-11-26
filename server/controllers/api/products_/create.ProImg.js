const express = require('express');
const router = express.Router();
const { ProductImage, Product } = require('../../../models');

// Endpoint to create a product image
router.post('/product-images', async (req, res) => {
  try {
    const { ProductID, ImageUrl } = req.body;

    // Validate relationships
    const product = await Product.findByPk(ProductID);
    if (!product) {
      return res.status(404).json({ message: `Product with ID ${ProductID} not found.` });
    }

    // Create new product image
    const newProductImage = await ProductImage.create({ ProductID, ImageUrl });

    res.status(201).json({
      message: 'Product image created successfully.',
      productImage: newProductImage,
    });
  } catch (error) {
    console.error('Error creating product image:', error.message);
    res.status(500).json({ message: 'Failed to create product image.', error: error.message });
  }
});

module.exports = router;
