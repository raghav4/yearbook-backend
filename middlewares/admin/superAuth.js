require('dotenv').config();
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token)
    return res.status(401).send('Access denied! No token Provided');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    if (decoded.isAdmin === undefined || !decoded.isAdmin) {
      return res.status(403).send('Access Denied');
    }
    req.admin = decoded;
  } catch (ex) {
    return res.status(400).send('Invalid Token');
  }
  return next();
};
