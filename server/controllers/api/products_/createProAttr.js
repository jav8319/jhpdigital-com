const express = require('express');
const router = express.Router();
const { ProductAttribute, Product, Attribute } = require('../../../models');

// Endpoint to create a product attribute
router.post('/product-attributes', async (req, res) => {
  try {
    const { ProductID, AttributeID, Value } = req.body;

    // Validate relationships
    const product = await Product.findByPk(ProductID);
    if (!product) {
      return res.status(404).json({ message: `Product with ID ${ProductID} not found.` });
    }

    const attribute = await Attribute.findByPk(AttributeID);
    if (!attribute) {
      return res.status(404).json({ message: `Attribute with ID ${AttributeID} not found.` });
    }

    // Create new product attribute
    const newProductAttribute = await ProductAttribute.create({ ProductID, AttributeID, Value });

    res.status(201).json({
      message: 'Product attribute created successfully.',
      productAttribute: newProductAttribute,
    });
  } catch (error) {
    console.error('Error creating product attribute:', error.message);
    res.status(500).json({ message: 'Failed to create product attribute.', error: error.message });
  }
});

module.exports = router;
