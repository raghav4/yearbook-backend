const { validateSignUp, validateOTP } = require('./signup');
const { LogInValidation } = require('./login');

exports.validateOTP = validateOTP;
exports.validateSignUp = validateSignUp;
exports.LogInValidation = LogInValidation;
