require('dotenv').config();
const jwt = require('jsonwebtoken');

// TODO #13: jwt token does not exists, i.e the token is valid but does not exist
module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied! No token Provided');

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = decoded;
  } catch (ex) {
    return res.status(400).send('Invalid Token');
  }
  return next();
};
