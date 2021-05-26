const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const {error} = require('../middlewares');
const routes = require('../routes');
// const { info, answers, messages } = require('../routes/user');
// const { welcome, loginUser, signup, resetPassword } =
// require('../routes/public'); const { loginAdmin, adminRegister,
// userQuestions, polls } = require('../routes/admin');

module.exports = (app) => {
  app.use(
      cors({
        exposedHeaders : [ 'Content-Length', 'x-auth-token' ],
      }),
  );
  app.use(express.json());
  app.use(express.urlencoded({extended : true}));
  app.use(fileUpload());
  app.use('/api', routes);
  // app.use('/api/user/login', loginUser);
  // app.use('/api/user/signup', signup);
  // app.use('/api/user/info', info);
  // app.use('/api/user/answers', answers);
  // app.use('/api/user/messages', messages);
  // // app.use('/api/user/reset', resetPassword);
  // app.use('/api/admin/auth', loginAdmin);
  // app.use('/api/admin/r', adminRegister);
  // app.use('/api/admin/user', adminRegister);
  // app.use('/api/admin/questions', userQuestions);
  // app.use('/api/admin/polls', polls);
  // app.use('/', welcome);
  // app.use(error);
};
