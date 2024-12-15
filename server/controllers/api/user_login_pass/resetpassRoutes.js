const router = require('express').Router();
const { User} = require('../../../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');


router.post('/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    console.log("token: ", token);
    console.log("password", password)

    const user = await User.findOne(
        {
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: {
                [Op.gt]: Date.now(),
              },
            },
          }
    );
  
    if (!user) {
      return res.status(400).send('Password reset token is invalid or has expired.');
    }
  let hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
  
    await user.save();
  
    // Consider logging the user in directly or sending a confirmation email here
  
    res.send('Your password has been updated.');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  });
  module.exports = router;




  