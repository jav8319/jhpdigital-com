const express = require('express');
const router = express.Router();
const { Category } = require('../../../../models');

// Endpoint to create a new category
router.post('/categories', async (req, res) => {
  try {
    const { CategoryName } = req.body;

    // Validate required fields
    if (!CategoryName) {
      return res.status(400).json({ message: 'CategoryName is required.' });
    }

    // Create new category
    const newCategory = await Category.create({ CategoryName });

    res.status(201).json({
      message: 'Category created successfully.',
      category: newCategory,
    });
  } catch (error) {
    console.error('Error creating category:', error.message);
    res.status(500).json({ message: 'Failed to create category.', error: error.message });
  }
});

module.exports = router;
