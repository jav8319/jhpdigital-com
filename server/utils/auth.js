const sequelize = require('../config/connection');

const withAuth = (req, res, next) => {
  if (req.session && req.session.loggedIn) {
    const now = Date.now();
    console.log('Now:', now);
    const sessionExpiryTime = new Date(req.session.cookie.expires).getTime();

    console.log('Session expiry time:', sessionExpiryTime);

    if (sessionExpiryTime > now) {
      return next();
    } else {
      // Session has expired
      // req.session.destroy(err => {
      //   if (err) {
      //     return res.status(500).json({ message: 'Failed to destroy session', error: err });
      //   }
      //   return res.status(401).json({ message: 'Session expired. Please log in again.' });
      // });
      req.session.destroy((err) => {
        if (err) {
      return res.status(500).json({ message: 'Failed to destroy session', error: err });
        } else {
          return   res.status(401).json({ message: 'Session expired. Please log in again.' });
        }
      });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized: Please log in first' });
  }
};

module.exports = withAuth;
