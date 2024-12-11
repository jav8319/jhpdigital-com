const path = require('path');
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const models  = require('./models');
const cors = require('cors');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3001;

let myenv=process.env.ENVIRONMENT
let securedef
let strict

if(myenv==='production'||myenv==='test'){
 securedef=true
 strict='strict'
}else{
 strict='lax'
}

var myStore = new SequelizeStore({
 db: sequelize,
});

if(myenv==='development'){
 app.use(cors({
  origin:  'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
 }));
}

const sess = {
 secret: 'Super secret secret',
 cookie: {
  maxAge: 24*3*1000,
  httpOnly: true,
  secure: securedef,
  sameSite: strict,
 },
 resave: false,
 saveUninitialized: false,
 store: myStore
};

app.use(cookieParser());
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(async (req, res, next) => {

  try {
    const emailadmin=process.env.ADMIN_EMAIL
  let findadmin= await models.User.findOne({ where: { email: emailadmin }} );
  if (!findadmin) {
    const adminpass = generateRandomString(10);
    const appointmentsender=process.env.APPOINTMENTSENDER
    const appsenderpass=process.env.APPSENDERPASS 
    const appsendermail=process.env.APPSENDERMAIL
   
    await models.User.create({
      username: "administrador",
      email: emailadmin,
      password: adminpass,
      role: 'admin',
      address:'my mail address'
    });

      let transporter = nodemailer.createTransport({
        service: appsendermail,
        auth: {
          user: appointmentsender,
          pass: appsenderpass,
        },
      });
      let mailOptions = {
        from: appointmentsender,
        to: appointmentsender,
        subject: 'Usuario administrador creado',
        text: `Tu cuenta de administrador ha sido creada con éxito.\n\n\n\nUsuario: administrador\n\nContraseña: ${adminpass}`,
      };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
 }
  next();
} catch (err) {
  console.error(err);
  res.status(500).send('Internal server error');
}
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  
  app.listen(PORT, () => console.log('Now listening'));
});

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}