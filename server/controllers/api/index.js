const router = require('express').Router();
const userRoutes = require('./user_login_pass/userRoutes');
const passRoutes = require('./user_login_pass/passRoutes');

// const createAvailabilityRoutes = require('./availability/createAvailabilityRoutes');//1

router.use('/user', userRoutes);
router.use('/newpassword', passRoutes);
router.use('/user', userRoutes);

// router.use('/setavailability', createAvailabilityRoutes);//1

module.exports = router;
