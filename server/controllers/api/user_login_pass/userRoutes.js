const router = require('express').Router();
const { User } = require('../../../models');
const nodemailer = require('nodemailer');
const withAuth = require('../../../utils/auth');
require('dotenv').config();

const Sender = process.env.APPOINTMENTSENDER;
const SenderEmail = process.env.APPSENDERMAIL;
const SenderPass= process.env.APPSENDERPASS;
// CREATE new user

async function sendOrderEmail(to, email, pass) {
  let transporter = nodemailer.createTransport({
    service: SenderEmail,
    auth: {
      user: Sender,
      pass: SenderPass,
    },
  });
  let mailOptions = {
    from: Sender,
    to: email,
    subject: 'Nuevo usuario creado',
    text: `Estimdado Usuario tus credenciales son:\nUsuario: ${to}\nContraseña: ${pass}\n email: ${email}`
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

router.post('/',withAuth,  async (req, res) => {
  try {
    
const mypass = generateRandomString(9)

    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: mypass,
      address: req.body.address,
    });

      res.status(200).json({ message: 'User created successfully' })
      await sendOrderEmail(req.body.username, req.body.email, mypass);
  ;
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
      req.session.email = dbUserData.email;
      req.session.address = dbUserData.address;
      req.session.role = dbUserData.role;

        
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






// router.post('/send-email', async (req, res) => {
//   let { email } = req.body;

  
// try {
//   const user = await User.findOne({
//       where: {
//           email: email
//       }
//   });


//   if(user){

//     let newPassword = Math.random().toString(36).slice(-11);

//     // hash the new password
//     let hashedPassword = await bcrypt.hash(newPassword, 10);

//     // update the user's password in the database
//     await User.update({ password: hashedPassword }, {
//       where: {
//         email: email
//       }
//     });
    
//   let transporter = nodemailer.createTransport({
//     service: Sender, // replace with your email provider
//     auth: {
//       user: SenderEmail, // replace with your email
//       pass: SenderPass, // replace with your password
//     },
//   });

//   let mailOptions = {
//     from: SenderEmail, // sender address
//     to:email, // list of receivers
//     subject: "password reset|not-replay email",
//     text: `your new password is ${newPassword}`
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).send('Email sent successfully');
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Error in sending email');
//   }
// } else {
//   res.status(404).send('User not found');
// }
//   // You can also use this user object within this scope

// } catch (err) {
//   console.error(err);
// }
  
// });





  // const speakeasy = require('speakeasy');
  // const QRCode = require('qrcode');
  // const User = require('./models/User'); // Assuming a User model
  
  // // Registration endpoint
  // app.post('/register', async (req, res) => {
  //     const { username, password } = req.body;
  
  //     // Generate a TOTP secret for the new user
  //     const secret = speakeasy.generateSecret({
  //         name: 'YourAppName',
  //     });
  
  //     // Create a new user with the TOTP secret
  //     const user = new User({
  //         username,
  //         password: hashPassword(password), // Hash the password
  //         totpSecret: secret.base32,
  //         is2FAEnabled: true, // Mark 2FA as enabled by default
  //     });
  
  //     await user.save();
  
  //     // Generate a QR code for the user to scan
  //     QRCode.toDataURL(secret.otpauth_url, (err, data) => {
  //         if (err) return res.status(500).send({ message: 'Error generating QR code' });
  
  //         res.send({
  //             message: 'Account created. Scan this QR code with Google Authenticator to enable 2FA.',
  //             qrCode: data,
  //         });
  //     });
  // });
  










module.exports = router;
