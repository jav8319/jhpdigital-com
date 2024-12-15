const router = require('express').Router();
const models = require('../../../models');
const withAuth = require('../../../utils/auth');

router.get('/:tasks', withAuth, async (req, res) => {
  try {
    const { tasks } = req.params;

    // Parse tasks and split into user ID and task elements
    const [userId, taskElementsString] = tasks.split('[]');
    if (!userId || !taskElementsString) {
      return res.status(400).send('Invalid task format.');
    }

    const taskElements = taskElementsString.split('&&');

    // Fetch user details
    const user = await models.User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Fetch tasks in parallel
    const teachingTasks = [];
    const maintenanceTasks = [];

    await Promise.all(
      taskElements.map(async (element) => {
        // Fetch task code
        const task = await models.Task.findOne({ where: { TaskCode: element } });
        if (!task) return;

        // Fetch teaching and maintenance tasks
        const teachingTask = await models.TeachingJob.findOne({ where: { TaskCode: task.id } });
        if (teachingTask) teachingTasks.push({...teachingTask, taskid: task.id});

        const maintenanceTask = await models.MaintenanceJob.findOne({ where: { TaskCode: task.id } });
        if (maintenanceTask) maintenanceTasks.push({...maintenanceTask, taskid: task.id});
      })
    );

    // Return results
    res.status(200).json({ userdata: user, teaching: teachingTasks, maintenance: maintenanceTasks });

  } catch (error) {
    console.error('Error in fetching tasks:', error.message);
    res.status(500).send('Internal server error.');
  }
});

module.exports = router;