const winston = require('winston');

module.exports = (err, req, res, next) => {
  winston.error(err.message, err);
  return res.status(500).send({ 'Internal Server Error': 'Something failed' });
};
