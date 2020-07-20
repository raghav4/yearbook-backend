const auth = require('./auth.middleware');
const error = require('./error.middleware');
const adminAuth = require('./adminAuth.middleware');
const validator = require('./validator.middleware');
const validateObjectId = require('./validateObjectId.middleware');

module.exports = {
  auth,
  error,
  validator,
  adminAuth,
  validateObjectId,
};
