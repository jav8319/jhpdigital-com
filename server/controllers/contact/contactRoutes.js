const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const { bucketName, storage } = require('../../config/connectionGC');
const nodemailer = require('nodemailer');
require('dotenv').config();

const Sender = process.env.APPOINTMENTSENDER;
const SenderEmail = process.env.APPSENDERMAIL;
const SenderPass = process.env.APPSENDERPASS;
const EmailNotification = process.env.ADMIN_EMAIL

// Restrict file size to 500 KB and allow only PDF files
const multerStorage = multer.memoryStorage();
const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 500 * 1024 }, // 500 KB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['application/pdf'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Only PDF files are allowed.'));
    }
    cb(null, true);
  },
});

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, email, phonenumber, address } = req.body;
    const myfile = req.file;

    // Validate that exactly one file was uploaded
    if (!myfile) {
      return res.status(400).json({ message: 'A single PDF file is required.' });
    }

    const { buffer, originalname, mimetype } = myfile;

    const bucket = storage.bucket(bucketName);
    const filename = Date.now() + path.extname(originalname);
    const blob = bucket.file(filename);

    let gcurl = '';
    await new Promise((resolve, reject) => {
      const writeStream = blob.createWriteStream({
        metadata: { contentType: mimetype },
        resumable: false,
      });

      writeStream.on('finish', () => {
        gcurl = `https://storage.googleapis.com/${bucketName}/${filename}`;
        resolve();
      });

      writeStream.on('error', reject);

      // Write the file buffer to Google Cloud Storage
      writeStream.end(buffer);
    });

    // Send email with file URL
    await sendEmail(name, email, phonenumber, address, gcurl);

    // Return success response
    res.status(200).json({ message: 'Gracias por contactarnos. Nos comunicaremos contigo pronto.' });
  } catch (error) {
    console.error('Error processing the request:', error.message);
    res.status(500).send('Internal server error.');
  }
});

module.exports = router;

async function sendEmail(Name, Email, Phonenumber, Address, gcurl) {
  let transporter = nodemailer.createTransport({
    service: SenderEmail,
    auth: {
      user: Sender,
      pass: SenderPass,
    },
  });
  let mailOptions = {
    from: Sender,
    to: EmailNotification,
    subject: 'Nueva solicitud de Usuario',
    text: `Datos contacto:\n\n
    Nombre: ${Name}\n
    Correo: ${Email}\n
    Teléfono: ${Phonenumber}\n
    Dirección: ${Address}\n
    Hoja de vida: ${gcurl}\n`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}



