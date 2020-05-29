const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { error } = require('../middlewares');
const { main } = require('../routes/routes.json');
const { welcome, onboarding } = require('../routes/public');
const { self, answers, messages } = require('../routes/user');
const {
  loginAdmin,
  adminRegister,
  userQuestions,
  polls,
} = require('../routes/admin');

const { user, admin } = main;

module.exports = (app) => {
  app.use(
    cors({
      exposedHeaders: ['Content-Length', 'x-auth-token'],
    }),
  );
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(fileUpload());
  app.use('/api/user/self', self);
  app.use(user.answers, answers);
  app.use(user.messages, messages);
  app.use(user.onboarding, onboarding);
  app.use(admin.login, loginAdmin);
  app.use('/api/admin/r', adminRegister);
  app.use('/api/admin/user', adminRegister);
  app.use('/api/admin/questions', userQuestions);
  app.use('/api/admin/polls', polls);
  app.use('/', welcome);
  // app.use(error);
};
