require('dotenv').config();
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:adminauth');

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');
  debug(req.header('x-auth-token'));
  if (!token)
    return res.status(401).send('Access denied! No token Provided');

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    debug(decoded);
    if (decoded.isAdmin === undefined || !decoded.isAdmin) {
      return res.status(403).send('Access Denied');
    }
    req.admin = decoded;
  } catch (ex) {
    return res.status(400).send('Invalid Token');
  }
  return next();
};
