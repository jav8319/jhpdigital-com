const express = require('express');
const router = express.Router();
const { Spec } = require('../../../../models');

// Endpoint to create a new spec
router.post('/specs', async (req, res) => {
  try {
    const { SpecName } = req.body;

    // Validate required fields
    if (!SpecName) {
      return res.status(400).json({ message: 'SpecName is required.' });
    }

    // Create new spec
    const newSpec = await Spec.create({ SpecName });

    res.status(201).json({
      message: 'Spec created successfully.',
      spec: newSpec,
    });
  } catch (error) {
    console.error('Error creating spec:', error.message);
    res.status(500).json({ message: 'Failed to create spec.', error: error.message });
  }
});

module.exports = router;
