const router = require('express').Router();
const withAuth = require('../../../utils/auth');
const { User, Schedule, UserSchedule } = require('../../../models');
const withAuth = require('../../../utils/auth'); // Middleware to ensure authentication

// Create a schedule for a user
router.post('/book', withAuth, async (req, res) => {
  try {
    const { ScheduleID, Booked } = req.body;

    // Check if the user and schedule exist
    const user = await User.findByPk(req.session.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const schedule = await Schedule.findByPk(ScheduleID);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Check if the user already booked this schedule
    const existingBooking = await UserSchedule.findOne({
      where: {
        UserID: req.session.userId,
        ScheduleID,
      },
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'User already booked this schedule' });
    }

    // Create the booking
    const newBooking = await UserSchedule.create({
      UserID: req.session.userId,
      ScheduleID,
      Booked,
    });

    res.status(201).json({ message: 'Schedule booked successfully', newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to book schedule', error: err.message });
  }
});

module.exports = router;
