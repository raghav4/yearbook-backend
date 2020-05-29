const { LogInValidation } = require('./login.validate');
const { validateSignUp, validateOTP } = require('./signup.validate');

module.exports = { LogInValidation, validateSignUp, validateOTP };
