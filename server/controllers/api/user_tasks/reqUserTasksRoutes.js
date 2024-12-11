const express = require('express');
const router = express.Router();
const {Task, UserTask} = require('../../../models');
const withAuth = require('../../../utils/auth');
const nodemailer = require('nodemailer');
require('dotenv').config();

const Sender = process.env.APPOINTMENTSENDER;
const SenderEmail = process.env.APPSENDERMAIL;
const SenderPass = process.env.APPSENDERPASS;
const EmailNotification = process.env.ADMIN_EMAIL

router.post('/', withAuth, async (req, res) => {
  try {
    const usertasks = req.usertasks?.body;
    if (!usertasks || !Array.isArray(usertasks)) {
      return res.status(400).json({ message: 'Datos de tareas inválidos' });
    }

    const usertaskPromises = usertasks.map(async (element) => {
      const usertasktofind = await Task.findOne({ where: { TaskCode: element } });
      if (usertasktofind) {
        await UserTask.create({
          taskID: usertasktofind.dataValues.id,
          UserID: req.session.userId,
          isApproved: false,
          isRequested: true,
        });
        return `&&${usertasktofind.dataValues.id}`;
      }
      return null;
    });

    const myUserTask = (await Promise.all(usertaskPromises)).filter(Boolean);
    const arrurltoemail = `${req.session.userId}[]${myUserTask.join('')}`;
    const isProduction = process.env.ENVIRONMENT?.toLowerCase() === 'production';
    const urltoemail = isProduction
      ? `${process.env.PRODUCTIONURL}/api/update_user_tasks/${arrurltoemail}`
      : `http://localhost:3000/api/update_user_tasks/${arrurltoemail}`;

    res.status(201).json({ message: 'Se solicitó nuevas tareas correctamente.' });
    sendEmail(req.session.email, req.session.username, urltoemail);
  } catch (error) {
    console.error('Error al crear tareas:', error.message);
    res.status(500).json({ message: 'No se pudo crear las tareas', error: error.message });
  }
});

async function sendEmail(email, user, link) {
  const transporter = nodemailer.createTransport({
    service: SenderEmail, // Cambiar al servicio que uses, por ejemplo, 'gmail'
    auth: {
      user: Sender,
      pass: SenderPass,
    },
  });

  const mailOptions = {
    from: Sender,
    to: EmailNotification,
    subject: 'Nueva solicitud de tareas',
    text: `El usuario ha solicitado una actualización de tareas:\n\n
Usuario: ${user}\nEmail: ${email}\n\n
Por favor, haga clic en el siguiente enlace para aprobar o rechazar las tareas solicitadas:\n${link}\n`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error.message);
  }
}



















module.exports = router;
