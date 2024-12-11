const router = require('express').Router();
const models = require('../../../models');
const withAuth = require('../../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    try {
       await models.Availability.destroy({
            where: {            
               UserID: req.session.userId 
            },
          });
      await models.Availability.bulkCreate(avail);
        res.status(200).json({ message: "Availability created successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
