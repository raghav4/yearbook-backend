const error = require('./error.middleware');
const validator = require('./validator.middleware');
const validateObjectId = require('./validateObjectId.middleware');

module.exports = {
  error,
  validator,
  validateObjectId,
};
