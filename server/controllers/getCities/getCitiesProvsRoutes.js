const router = require('express').Router();
const models = require('../../models');
const getColombiaTimeInUtcMilliseconds = require('../../utils/getColCurrentMillTime');
const { Op } = require('sequelize'); // To use Sequelize operators

router.get('/', async (req, res) => {
  try {
    const currentMillis = getColombiaTimeInUtcMilliseconds();
    const currentDay = new Date(currentMillis).getDay();

    // Step 1: Find live users
    const users = await models.User.findAll({ where: { isLive: true } });

    if (!users.length) {
      return res.status(404).json({
        message: 'Lo sentimos, no hay técnicos disponibles en este momento. Trata más tarde',
      });
    }

    // Step 2: Find availabilities matching the current day
    const availabilities = await models.Availability.findAll({
      where: { WeekDay: currentDay },
      attributes: ['UserID'], // Only fetch relevant UserIDs
    });

    if (!availabilities.length) {
      return res.status(404).json({
        message: 'Lo sentimos, no hay técnicos disponibles en este momento. Trata más tarde',
      });
    }

    // Step 3: Filter users by availability
    const availableUserIDs = availabilities.map((avail) => avail.UserID);
    const availableUsers = users.filter((user) => availableUserIDs.includes(user.id));

    if (!availableUsers.length) {
      return res.status(404).json({
        message: 'Lo sentimos, no hay técnicos disponibles en este momento. Trata más tarde',
      });      
    }

    // Step 4: Find cities for available users in parallel
    const cityIDs = [...new Set(availableUsers.map((user) => user.CityID))]; // Unique city IDs

    const availableCities = await models.City.findAll({
      where: { id: { [Op.in]: cityIDs } },
      attributes: ['id', 'CityName', 'ProvinceID'],
      include: [
        {
          model: models.Province,
          attributes: ['id', 'ProvinceName'],
        },
      ],
    });

    if (!availableCities.length) {
      return res.status(404).json({
        message: 'Lo sentimos, no hay técnicos disponibles en este momento. Trata más tarde',
      });
    }
    return res.status(200).json({ cities: availableCities });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ocurrió un error inesperado', error: err });
  }
});

module.exports = router;
