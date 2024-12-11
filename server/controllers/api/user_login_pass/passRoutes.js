const router = require('express').Router();
const {User} = require('../../../models');
const withAuth = require('../../../utils/auth');
const bcrypt = require('bcrypt');

router.post('/', withAuth, async (req, res) => {
  let passedpassword = req.body.password
  
try {
  const user = await User.findOne({
      where: {
          email: req.session.email
      }
  });

  if(user){

    let hashedPassword = await bcrypt.hash(passedpassword, 10);

    // update the user's password in the database
    const updated = await User.update({ password: hashedPassword }, {
      where: {
        email: req.session.email
      }
    });
    if(updated){
    res.status(200).send('Password changed sucessfully');
    } else {
      res.status(404).send('failed to change password');
    }
} else {
  res.status(404).send('User not found');
}
  // You can also use this user object within this scope

} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
  
});



module.exports = router;
