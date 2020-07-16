const polls = require('./polls.routes');
const adminOnBoarding = require('./onBoarding');
// const loginAdmin = require('./onBoarding/onboarding.routes');
// const adminRegister = require('./onBoarding/admin.routes');
const userQuestions = require('./questions.routes');

module.exports = {
  adminOnBoarding,
  userQuestions,
  polls,
};
