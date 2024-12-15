const router = require('express').Router();
const apiRoutes = require('./api');
const contactRoutes = require('./contact/contactRoutes');

router.use('/api', apiRoutes);
router.use('/joinus', contactRoutes);

module.exports = router;



