const router = require('express').Router();
const userRoutes = require('./user_login_pass/userRoutes');
const passRoutes = require('./user_login_pass/passRoutes');


router.use('/administrator', userRoutes);
router.use('/newpassword', passRoutes);

module.exports = router;
