const router = require('express').Router();
const {User} = require('../../../models');
const withAuth = require('../../../utils/auth');
const bcrypt = require('bcrypt');

router.post('/', withAuth, async (req, res) => {


  console.log('**********req body**********',req.body);
  console.log('*********re ses email************',req.session.email);
  
try {
  const user = await User.findOne({
      where: {
          email: req.session.email
      }
  });

  if(user){
    let mynewpassword = req.body.newpassword
    let mypassword = req.body.oldpassword
    
    const validPassword = user.checkPassword(mypassword);
  
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    let hashedPassword = await bcrypt.hash(mynewpassword, 10);

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
