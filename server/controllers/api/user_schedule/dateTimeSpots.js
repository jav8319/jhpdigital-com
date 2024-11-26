const express = require('express');
const router = express.Router();
const { Schedule } = require('../../../models');

// Endpoint to create a new schedule
router.post('/', async (req, res) => {


    //the front end will send a request to this endpoint with the following data:
    //An array of objects with the following properties:{scheduleDate: "2022-01-01", initialHour: "08:00AM", finalHour: "09:00PM"}
    //the backend should create rows in the Schedule table in the following way: the time between
    // the initialHour and finalHour should be divided in 30 minutes intervals, meaning if initial hour 
    //is 8:00AM and final hour is 9:00PM, the backend should create 26 rows in the Schedule table, one for each 30 minutes interval
    // between 8:00AM and 9:00PM

    try {
        const schedules = req.body; // Array of schedule objects
    
        // Validate input
        if (!Array.isArray(schedules) || schedules.length === 0) {
          return res.status(400).json({ message: 'Invalid input. Provide an array of schedule objects.' });
        }
    
        const scheduleEntries = [];
    
        schedules.forEach(({ scheduleDate, initialHour, finalHour }) => {
          const date = new Date(scheduleDate); // Parse date
          let startTime = new Date(`${scheduleDate}T${initialHour}`);
          const endTime = new Date(`${scheduleDate}T${finalHour}`);
    
          // Check for valid time range
          if (startTime >= endTime) {
            throw new Error(`Invalid time range for schedule on ${scheduleDate}`);
          }
    
          // Create 30-minute intervals
          while (startTime < endTime) {
            const nextTime = new Date(startTime.getTime() + 30 * 60 * 1000); // Add 30 minutes
            scheduleEntries.push({
              ScheduleDate: date.getTime(), // Store date as timestamp
              InitialHour: startTime.getTime(), // Start time as timestamp
              FinalHour: nextTime.getTime(), // End time as timestamp
            });
            startTime = nextTime; // Move to the next interval
          }
        });
    
        // Insert all generated schedule entries into the database
        const createdSchedules = await Schedule.bulkCreate(scheduleEntries);
    
        res.status(201).json({
          message: `${createdSchedules.length} schedule entries created successfully.`,
          schedules: createdSchedules,
        });
      } catch (error) {
        console.error('Error creating schedules:', error.message);
        res.status(500).json({ message: 'Failed to create schedules', error: error.message });
      }
    });
    
    module.exports = router;
