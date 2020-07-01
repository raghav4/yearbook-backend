require('dotenv').config();
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access Denied, no token provided');

  try {
    const decodedPayLoad = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decodedPayLoad;
    next();
  } catch (ex) {
    res.status(400).send('Invalid Token');
  }
  return next();
};
