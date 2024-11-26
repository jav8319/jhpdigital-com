const express = require('express');
const router = express.Router();
const { ProductSpec, Product, Spec } = require('../../../models');

// Endpoint to create a product specification
router.post('/product-specs', async (req, res) => {
  try {
    const { ProductID, SpecID, Value } = req.body;

    // Validate relationships
    const product = await Product.findByPk(ProductID);
    if (!product) {
      return res.status(404).json({ message: `Product with ID ${ProductID} not found.` });
    }

    const spec = await Spec.findByPk(SpecID);
    if (!spec) {
      return res.status(404).json({ message: `Spec with ID ${SpecID} not found.` });
    }

    // Create new product specification
    const newProductSpec = await ProductSpec.create({ ProductID, SpecID, Value });

    res.status(201).json({
      message: 'Product specification created successfully.',
      productSpec: newProductSpec,
    });
  } catch (error) {
    console.error('Error creating product specification:', error.message);
    res.status(500).json({ message: 'Failed to create product specification.', error: error.message });
  }
});

module.exports = router;
