const express = require('express');
const router = express.Router();
const { Product, Category, Subcategory } = require('../../../models');

// Endpoint to create a new product
router.post('/products', async (req, res) => {
  try {
    const {
      ProductGroupID,
      ProductCodeNum,
      CategoryID,
      SubcategoryID,
      ProductName,
      Description,
      Price,
      Stock,
      PackageWidth,
      PackageHeight,
      PackageLength,
      PackageWeight,
      ProductWidth,
      ProductHeight,
      ProductLength,
      ProductWeight,
      PreviousProduct,
      Obsolete,
    } = req.body;

    // Validate required fields
    if (
      !ProductGroupID ||
      !ProductCodeNum ||
      !CategoryID ||
      !ProductName ||
      !Price ||
      !Stock ||
      !PackageWidth ||
      !PackageHeight ||
      !PackageLength ||
      !PackageWeight ||
      !ProductWidth ||
      !ProductHeight ||
      !ProductLength ||
      !ProductWeight
    ) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Validate CategoryID
    const category = await Category.findByPk(CategoryID);
    if (!category) {
      return res.status(404).json({ message: `Category with ID ${CategoryID} not found.` });
    }

    // Validate SubcategoryID if provided
    if (SubcategoryID) {
      const subcategory = await Subcategory.findByPk(SubcategoryID);
      if (!subcategory) {
        return res.status(404).json({ message: `Subcategory with ID ${SubcategoryID} not found.` });
      }
    }

    // Create a new product
    const newProduct = await Product.create({
      ProductGroupID,
      ProductCodeNum,
      CategoryID,
      SubcategoryID,
      ProductName,
      Description,
      Price,
      Stock,
      PackageWidth,
      PackageHeight,
      PackageLength,
      PackageWeight,
      ProductWidth,
      ProductHeight,
      ProductLength,
      ProductWeight,
      PreviousProduct,
      Obsolete: Obsolete || false, // Default to false if not provided
    });

    res.status(201).json({
      message: 'Product created successfully.',
      product: newProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ message: 'Failed to create product.', error: error.message });
  }
});

module.exports = router;
