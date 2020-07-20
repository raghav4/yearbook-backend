require('dotenv').config();
const config = require('config');
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:authMiddleware');

module.exports = (req, res, next) => {
  debug('Authenticating request...');
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(401).send('Access Denied, no token provided');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
  } catch (ex) {
    debug(ex);
  }
  return next();
};
