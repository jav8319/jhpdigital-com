const express = require('express');
const router = express.Router();
const { Attribute } = require('../../../../models');

// Endpoint to create a new attribute
router.post('/attributes', async (req, res) => {
  try {
    const { AttributeName } = req.body;

    // Validate required fields
    if (!AttributeName) {
      return res.status(400).json({ message: 'AttributeName is required.' });
    }

    // Create new attribute
    const newAttribute = await Attribute.create({ AttributeName });

    res.status(201).json({
      message: 'Attribute created successfully.',
      attribute: newAttribute,
    });
  } catch (error) {
    console.error('Error creating attribute:', error.message);
    res.status(500).json({ message: 'Failed to create attribute.', error: error.message });
  }
});

module.exports = router;
