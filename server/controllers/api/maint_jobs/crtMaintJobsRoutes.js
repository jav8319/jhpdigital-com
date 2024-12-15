const router = express.Router();
const withAuth = require('../../../utils/auth');
const { MaintenanceJob,Task } = require('../../../models');
const randomString = require('../../../utils/genRandomCodeg');

// Endpoint to create a new maintenance job
router.post('/', withAuth, async (req, res) => {
  try {
    const TaskCode = randomString(8);
    const { MaintenanceName, Description, Price, Duration, PreviousM_job, Obsolete } = req.body;

    // Validate required fields
    if (!MaintenanceName || !Price || !Duration) {
      return res.status(400).json({ message: 'MaintenanceName, Price, and Duration are required.' });
    }

    // If PreviousM_job is provided, check if it exists
    if (PreviousM_job) {
      const previousJob = await MaintenanceJob.findByPk(PreviousM_job);
      if (!previousJob) {
        return res.status(404).json({ message: `Previous maintenance job with ID ${PreviousM_job} not found.` });
      }
    }

    // Create a new maintenance job
    const newMaintenanceJob = await MaintenanceJob.create({
      MaintenanceName,
      Description,
      Price,
      Duration,
      PreviousM_job,
      TaskCode,
      Obsolete: Obsolete || false, // Default to false if not provided
    });

    await Task.create({TaskCode: TaskCode})

    res.status(200).json({
      message: 'Maintenance job created successfully.',
      maintenanceJob: newMaintenanceJob,
    });
  } catch (error) {
    console.error('Error creating maintenance job:', error.message);
    res.status(500).json({ message: 'Failed to create maintenance job.', error: error.message });
  }
});

module.exports = router;
