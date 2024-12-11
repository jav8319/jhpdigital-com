const crypto = require('crypto'); // Built-in module
const router = require('express').Router();
const {User} = require('../../../models');
const nodemailer = require('nodemailer');
require('dotenv').config();

const appointmentsender=process.env.APPOINTMENTSENDER
const appsenderpass=process.env.APPSENDERPASS 
const appsendermail=process.env.APPSENDERMAIL
const productionurl=process.env.PRODUCTIONURL

async function sendLinkEmail(email, link) {

    let transporter = nodemailer.createTransport({
      service: appsendermail,
      auth: {
        user: appointmentsender,
        pass: appsenderpass,
      },
    });
  
    let mailOptions = {
      from: appointmentsender,
      to: email,
      subject: 'Reset-password',
      text: `Please, click on this link to reset your password: ${link} `,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  }
  
router.post('/', async (req, res) => {
  let fuser = await User.findOne({ where: { email:req.body.email } });
  if (!fuser) {
    return res.status(404).send('User not found.');
  }
  const resetToken = crypto.randomBytes(20).toString('hex');
  fuser.resetPasswordToken = resetToken;
  fuser.resetPasswordExpires = Date.now() + 5*60*1000; // 1 hour from now
  await fuser.save();
  let resetLink
  if(process.env.ENVIRONMENT==='development'){
    resetLink = `${productionurl}/resetpassword/${resetToken}`;
  }else{
    resetLink = `localhost:3000/resetpassword/${resetToken}`;
  }
  res.send('Password reset link has been sent to your email.');
  sendLinkEmail(req.body.email, resetLink)
});

module.exports = router;




