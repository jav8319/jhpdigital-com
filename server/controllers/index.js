const router = require('express').Router();
const apiRoutes = require('./api');
const contactRoutes = require('./contact/contactRoutes');
const maintServRoutes = require('./services/maintServRoutes');
const getCitiesProvsRoutes = require('./getCities/getCitiesProvsRoutes');

router.use('/api', apiRoutes);
router.use('/joinus', contactRoutes);
router.use('/maintsservs', maintServRoutes);
router.use('/mycities', getCitiesProvsRoutes);


module.exports = router;



