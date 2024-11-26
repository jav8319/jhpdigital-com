const express = require('express');
const router = express.Router();
const { T_Order, Schedule, TeachingJob } = require('../../../models');

// Endpoint to create a new teaching order
router.post('/', async (req, res) => {
  try {
    const {
      Name,
      Phone,
      Address,
      Email,
      ScheduleID,
      TeachingJobID,
      TransactionValue,
      JobDuration,
      ZoomID,
      TransactionRefNum1,
      TransactionRefNum2,
    } = req.body;

    // Validate required fields
    if (!Name || !ScheduleID || !TeachingJobID || !TransactionValue || !JobDuration || !TransactionRefNum1) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Validate ScheduleID exists
    const schedule = await Schedule.findByPk(ScheduleID);
    if (!schedule) {
      return res.status(404).json({ message: `Schedule with ID ${ScheduleID} not found.` });
    }

    // Validate TeachingJobID exists
    const teachingJob = await TeachingJob.findByPk(TeachingJobID);
    if (!teachingJob) {
      return res.status(404).json({ message: `Teaching job with ID ${TeachingJobID} not found.` });
    }

    // Create the new teaching order
    const newOrder = await T_Order.create({
      Name,
      Phone,
      Address,
      Email,
      ScheduleID,
      TeachingJobID,
      TransactionValue,
      JobDuration,
      ZoomID,
      TransactionRefNum1,
      TransactionRefNum2,
    });

    res.status(201).json({
      message: 'Teaching order created successfully.',
      teachingOrder: newOrder,
    });
  } catch (error) {
    console.error('Error creating teaching order:', error.message);
    res.status(500).json({ message: 'Failed to create teaching order.', error: error.message });
  }
});

module.exports = router;

