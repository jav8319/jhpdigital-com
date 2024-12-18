const path = require('path');
require('dotenv').config({path: '../.env'});
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const models = require('./models');
const cors = require('cors');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

const app = express();

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
console.log('Environment:', NODE_ENV);
const isProduction = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';

const sessionSecure = isProduction || isTest;
const sameSitePolicy = isProduction ? 'strict' : 'lax';

const myStore = new SequelizeStore({ db: sequelize });
if (NODE_ENV === 'development') {
  app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
}
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'Super secret secret',
  cookie: {
    maxAge:30 * 60 * 1000, // 3 days
    httpOnly: true,
    secure: sessionSecure,
    sameSite: sameSitePolicy,
  },
  resave: false,
  saveUninitialized: false,
  store: myStore,
};

app.use(cookieParser());
app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (isProduction) {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get('/acerca', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get('/mantenimiento' , (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get('/clases', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get('/tienda', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/unirse", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/availability", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/mant_admin", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/clases_admin", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/ver_producto", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/crear_producto", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/ver_habilidades", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/ver_trabajos", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/ver_ordenes", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/mod_clave", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.get("/resetpassword/:token", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  initializeAdminUser();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});


function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

async function initializeAdminUser() {
  try {
    const emailAdmin = process.env.ADMIN_EMAIL;
    const cityAdmin = process.env.ADMIN_CITY;
    const stateAdmin = process.env.ADMIN_STATE;
    let adminExists = await models.User.findOne({ where: { email: emailAdmin } });
    if (!adminExists) {
      const adminprovice = await models.Province.create({ProvinceName: stateAdmin});
      if (adminprovice) {
        const adminCity = await models.City.create({CityName: cityAdmin, ProvinceID: adminprovice.dataValues.id});
        if (adminCity) {
          const adminPassword = generateRandomString(10);
          await models.User.create({
            username: "administrator",
            email: emailAdmin,
            password: adminPassword,
            ProvinceID: adminprovice.dataValues.id,
            CityID: adminCity.dataValues.id,
            role: 'admin',
            address: 'Administrator address',
          });
          const transporter = nodemailer.createTransport({
            service: process.env.APPSENDERMAIL,
            auth: {
              user: process.env.APPOINTMENTSENDER,
              pass: process.env.APPSENDERPASS,
            },
          });
          const mailOptions = {
            from: process.env.APPOINTMENTSENDER,
            to: emailAdmin,
            subject: 'Admin Account Created',
            text: `Your admin account has been successfully created.\n\nUsername: administrator\nPassword: ${adminPassword}`,
          };
          await transporter.sendMail(mailOptions);
          console.log('Admin account created and email sent.'); 
        }
      }
    }
  } catch (error) {
    console.error('Error during admin user initialization:', error.message);
  }
}