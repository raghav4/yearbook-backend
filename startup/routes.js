const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const {error} = require('../middlewares');
// const { main } = require('../routes/routes.json');
// const { welcome, userOnBoarding } = require('../routes/onboarding');
// const { self, answers } = require('../routes/user');
// const { message, slamBook } = require('../routes');
// const { slamBookQuestions, polls, adminOnBoarding } =
// require('../routes/admin');

// const { user, admin } = main;

module.exports = (app) => {
  app.use(
      cors({
        exposedHeaders : [ 'Content-Length', 'x-auth-token' ],
      }),
  );
  app.use(bodyParser.json());
  app.use(
      bodyParser.urlencoded({
        extended : true,
      }),
  );
  app.use(fileUpload());
  // app.use(user.info, self);
  // app.use(user.answers, slamBook);
  // app.use(user.messages, message);
  // app.use(admin.onboarding, userOnBoarding);
  // app.use('/api/admin/r', adminRegister);
  // app.use('/api/admin', adminOnBoarding);
  // app.use('/api/admin/user', adminRegister);
  // app.use('/api/admin/questions', slamBookQuestions);
  // app.use('/api/admin/polls', polls);
  // app.use('/', welcome);
  app.use(error);
};
