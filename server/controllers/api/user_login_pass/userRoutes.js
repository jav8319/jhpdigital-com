const router = require('express').Router();
const { User } = require('../../../models');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Sender = process.env.APPOINTMENTSENDER;
const SenderEmail = process.env.APPSENDERMAIL;
const SenderPass= process.env.APPSENDERPASS;
// CREATE new user
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.loggedIn = true;
      req.session.user = dbUserData.username;

      res.status(200).json({ message: 'You are now logged in!' })
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email
      }
    });
 

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.loggedIn = true;
      req.session.user = dbUserData.username;
        
      res.status(200).json({ message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {

    req.session.destroy((err) => {
      if (err) {
        console.error('Error during logout:', err);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(200).json({ message: 'Logout successful' });
      }
    });
  
});

router.post('/send-email', async (req, res) => {
  let { email } = req.body;

  
try {
  const user = await User.findOne({
      where: {
          email: email
      }
  });


  if(user){

    let newPassword = Math.random().toString(36).slice(-11);

    // hash the new password
    let hashedPassword = await bcrypt.hash(newPassword, 10);

    // update the user's password in the database
    await User.update({ password: hashedPassword }, {
      where: {
        email: email
      }
    });
    
  let transporter = nodemailer.createTransport({
    service: Sender, // replace with your email provider
    auth: {
      user: SenderEmail, // replace with your email
      pass: SenderPass, // replace with your password
    },
  });

  let mailOptions = {
    from: SenderEmail, // sender address
    to:email, // list of receivers
    subject: "password reset|not-replay email",
    text: `your new password is ${newPassword}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error in sending email');
  }
} else {
  res.status(404).send('User not found');
}
  // You can also use this user object within this scope

} catch (err) {
  console.error(err);
}
  
});




module.exports = router;
