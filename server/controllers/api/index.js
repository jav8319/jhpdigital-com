const router = require('express').Router();
const userRoutes = require('./user_login_pass/userRoutes');
const getAvailRoutes = require('../api/availability/getAvailRoutes')
const crtAvailRoutes = require('../api/availability/createAvailRoutes')
const passRoutes = require('./user_login_pass/passRoutes')
const forgotpassRoutes = require('./user_login_pass/forgotpassRoutes')
const resetpassRoutes = require('./user_login_pass/resetpassRoutes')

// const createAvailabilityRoutes = require('./availability/createAvailabilityRoutes');//1

router.use('/user', userRoutes);
router.use('/newpassword', passRoutes);
router.use('/user', userRoutes);
router.use('/getavailability', getAvailRoutes);
router.use('/crtavailability', crtAvailRoutes);
router.use('/changepass', passRoutes);
router.use('/forgot-password', forgotpassRoutes);
router.use('/respass', resetpassRoutes);

// router.use('/setavailability', createAvailabilityRoutes);//1

module.exports = router;
