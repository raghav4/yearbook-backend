require('dotenv').config();
const config = require('config');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied! No token Provided');
  const decoded = jwtDecode(token);
  if (decoded.isSuperAdmin !== undefined || decoded.isUser !== undefined) {
  }
  return next();
};
