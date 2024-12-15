const router = require('express').Router();
const models = require('../../../models');
const withAuth = require('../../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
        if (!Array.isArray(req.body)) {
          return res.status(400).json({ message: 'Invalid data format. Expecting an array.' });
        }
    
        const avail = req.body.map((slot) => ({
          ...slot,
          UserID: req.session.userId, // Attach the UserID from the session
        }));
    
        // Clear old availability records for this user
        await models.Availability.destroy({
          where: {
            UserID: req.session.userId,
          },
        });
    
        // Insert new availability records
        await models.Availability.bulkCreate(avail);
    
        res.status(200).json({ message: 'Availability created successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update availability', details: err });
      }
    });
    
    module.exports = router;
