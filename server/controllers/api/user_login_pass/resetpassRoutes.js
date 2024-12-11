const router = require('express').Router();
const { User} = require('../../../models');


router.post('/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

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
  
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
  
    await user.save();
  
    // Consider logging the user in directly or sending a confirmation email here
  
    res.send('Your password has been updated.');
  });
  module.exports = router;




  