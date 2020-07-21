const debug = require('debug')('app:adminAuth');

module.exports = async (req, res, next) => {
  debug('Authentication admin...');
  if (req.user.authType !== 'admin') {
    return res.status(403).send('Forbidden : Access Denied');
  }
  return next();
};
