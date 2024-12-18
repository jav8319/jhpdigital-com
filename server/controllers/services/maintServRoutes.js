const router = require('express').Router();
const models = require('../../models');
const getColombiaTimeInUtcMilliseconds = require('../../utils/getColCurrentMillTime');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    // Step 1: Get current time and date in Colombia
    const currentMillis = getColombiaTimeInUtcMilliseconds();
    const currentDate = new Date(currentMillis);
    const currentDay = currentDate.getDay();

    const { city, province } = req.query;
   

    // Step 2: Find live technicians in the city and province
    const usersInCity = await models.User.findAll({
      where: { CityID: city, ProvinceID: province, isLive: true },
      attributes: ['id', 'username'],
    });

    if (!usersInCity.length) {
      return res.status(404).json({ message: 'No hay técnicos disponibles en esta ciudad.' });
    }

    // Step 3: Find available technicians for the current day
    const availableTechnicians = await models.Availability.findAll({
      where: { WeekDay: currentDay },
      attributes: ['UserID'],
    });

    const availableUserIDs = availableTechnicians.map((avail) => avail.UserID);
    const filteredUsers = usersInCity.filter((user) => availableUserIDs.includes(user.id));

    if (!filteredUsers.length) {
      return res.status(404).json({ message: 'No hay técnicos disponibles en este momento.' });
    }

    // Step 4: Exclude technicians who are booked
    const nextDay = new Date(currentMillis);
    nextDay.setDate(currentDate.getDate() + 1);

    const bookings = await models.MaintBooking.findAll({
      where: {
        dateStartScheduled: { [Op.gte]: currentDate, [Op.lt]: nextDay },
        isBooked: true,
      },
      attributes: ['UserID'],
    });

    const bookedUserIDs = bookings.map((booking) => booking.UserID);
    const availableUsers = filteredUsers.filter((user) => !bookedUserIDs.includes(user.id));

    if (!availableUsers.length) {
      return res.status(404).json({ message: 'No hay técnicos disponibles en este momento.' });
    }

    // Step 5: Get the skills of available technicians
    const userTasks = await models.UserTask.findAll({
      where: { isApproved: true },
      attributes: ['UserID', 'taskID'],
    });

    const skills = userTasks.filter((task) =>
      availableUsers.some((user) => user.id === task.UserID)
    );

    const skillTaskIDs = [...new Set(skills.map((skill) => skill.taskID))];
   
    const taskJobs = await models.Task.findAll({
      where: { id: { [Op.in]: skillTaskIDs } }, // Ensure data types match
      attributes: ['TaskCode'],
    });
    const taskcodesarr = taskJobs.map((task) => task.TaskCode);
    // Step 6: Match maintenance jobs to available skills
  // Step 6: Match maintenance jobs to available skills
const maintenanceJobs = await models.MaintenanceJob.findAll({
  where: { TaskCode: { [Op.in]: taskcodesarr } }, // Ensure data types match
  attributes: ['id', 'MaintenanceName', 'Description', 'Price', 'Duration', 'TaskCode', 'DeviceID', 'Obsolete'],
});



    // Step 7: Get Device Types for matching jobs
    const deviceTypes = await models.DeviceType.findAll({
      attributes: ['id', 'DeviceName'],
    });

    if (!maintenanceJobs.length || !deviceTypes.length) {
      return res.status(404).json({ message: 'No hay trabajos de mantenimiento disponibles.' });
    }

    // Format the response
    const formattedJobs = maintenanceJobs.map((job) => ({
      id: job.id,
      name: job.MaintenanceName,
      description: job.Description,
      price: parseFloat(job.Price).toFixed(2),
      duration: job.Duration,
      taskCode: job.TaskCode,
      deviceID: job.DeviceID,
      obsolete: job.Obsolete,
    }));

    const formattedDevices = deviceTypes.map((device) => ({
      id: device.id,
      name: device.DeviceName,
    }));
    if (!formattedJobs.length || !formattedJobs.length) {
      return res.status(404).json({ message: 'No hay trabajos de mantenimiento disponibles.' });
    }

    console.log('***************formattedJobs****************', formattedJobs);
    console.log('***************formattedDevices****************', formattedDevices);

    return res.status(200).json({
      maints: formattedJobs,
      mydevices: formattedDevices,
    });
  } catch (error) {
    console.error('Error processing the request:', error.message);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;