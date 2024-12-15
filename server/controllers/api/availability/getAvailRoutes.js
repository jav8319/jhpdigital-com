const router = require('express').Router();
const models = require('../../../models');
const withAuth = require('../../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    // router.use('/getavailability', getAvailRoutes);
    try {
      let availabilities = await models.Availability.findAll({
            where: {            
               UserID: req.session.userId 
            },
          });

        if (!availabilities.length) {
            return res.status(201).json({ availability:[],Ihh: 360, Fhh: 1200, Imin: 30});
        }
        res.status(200).json({ availability: availabilities,Ihh: 360, Fhh: 1200, Imin: 30});
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
