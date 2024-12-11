const express = require('express');
const router = express.Router();
const withAuth = require('../../../utils/auth');
const { TeachingJob, TaskCode } = require('../../../models');
const randomString = require('../../../utils/genRandomCodeg');

// Endpoint to create a new teaching job
router.post('/', withAuth,  async (req, res) => {
  try {

    const TaskCode = randomString(8);
    const { TeachingJobName, Description, Price, Duration, PreviousT_job, Obsolete } = req.body;

    // Validate required fields
    if (!Price || !Duration) {
      return res.status(400).json({ message: 'Price and Duration are required.' });
    }

    // If PreviousT_job is provided, check if it exists
    if (PreviousT_job) {
      const previousJob = await TeachingJob.findByPk(PreviousT_job);
      if (!previousJob) {
        return res.status(404).json({ message: `Previous teaching job with ID ${PreviousT_job} not found.` });
      }
    }

    // Create a new teaching job
    const newTeachingJob = await TeachingJob.create({
      TeachingJobName,
      Description,
      Price,
      Duration,
      PreviousT_job,
      TaskCode: TaskCode,
      Obsolete: Obsolete || false, // Default to false if not provided
    });


await TaskCode.create({TaskCode: TaskCode})

    res.status(201).json({
      message: 'Teaching job created successfully.',
      teachingJob: newTeachingJob,
    });
  } catch (error) {
    console.error('Error creating teaching job:', error.message);
    res.status(500).json({ message: 'Failed to create teaching job.', error: error.message });
  }
});

module.exports = router;
