const router = require('express').Router();
const models = require('../../../models');
const withAuth = require('../../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      const availabilities = await models.Availability.findAll({
            where: {            
               UserID: req.session.userId 
            },
          });

        if (!availabilities.length) {
            return res.status(404).json({ message: 'No availabilities found for this user.' });
        }
        res.status(200).json({ availability: availabilities });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
