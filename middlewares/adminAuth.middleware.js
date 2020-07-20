const debug = require('debug')('app:adminAuth');

module.exports = async (req, res, next) => {
  debug('Authenticating if the logged in user is an Admin or not');
  if (req.user.authType !== 'admin')
    return res.status(403).send('Access Denied');
  return next();
};
