const express = require('express');
const router = express.Router();
const { Subcategory, Category } = require('../../../../models');

// Endpoint to create a new subcategory
router.post('/subcategories', async (req, res) => {
  try {
    const { SubcategoryName, CategoryID } = req.body;

    // Validate that CategoryID exists
    const category = await Category.findByPk(CategoryID);
    if (!category) {
      return res.status(404).json({ message: `Category with ID ${CategoryID} not found.` });
    }

    // Create new subcategory
    const newSubcategory = await Subcategory.create({
      SubcategoryName,
      CategoryID,
    });

    res.status(201).json({
      message: 'Subcategory created successfully.',
      subcategory: newSubcategory,
    });
  } catch (error) {
    console.error('Error creating subcategory:', error.message);
    res.status(500).json({ message: 'Failed to create subcategory.', error: error.message });
  }
});

module.exports = router;
