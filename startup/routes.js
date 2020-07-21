/* eslint-disable no-unused-vars */
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { error } = require('../middlewares');
const polls = require('../routes/polls');
const message = require('../routes/message');
const welcome = require('../routes/welcome');
const slamBook = require('../routes/slamBook');
const onboarding = require('../routes/onboarding');
const users = require('../routes/users');
const { main } = require('../routes/routes.json');

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
  app.use(main.onboarding, onboarding);
  app.use(main.user, users);
  app.use(main.messages, message);
  app.use(main.polls, polls);
  app.use(main.slamBook, slamBook);
  app.use('/', welcome);
  // app.use(error);
};
