const polls = require('./polls.routes');
const loginAdmin = require('./login.routes');
const adminRegister = require('./admin.routes');
const userQuestions = require('./questions.routes');

module.exports = {
  loginAdmin,
  adminRegister,
  userQuestions,
  polls,
};
