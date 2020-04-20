const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const userQuestions = require('../routes/admin/manage/questions');
const managePolls = require('../routes/admin/manage/polls');
const registerUser = require('../routes/admin/manage/users');
const personalAnswers = require('../routes/user/questions/self');
const writingContent = require('../routes/user/questions/others');
const user = require('../routes/user/profile/details');
const votings = require('../routes/user/polls');
const storage = require('../utils/multer');
const welcome = require('../routes/welcome');

// eslint-disable-next-line func-names
module.exports = (app) => {
  app.use(
    cors({
      exposedHeaders: ['Content-Length', 'x-auth-token'],
    }),
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(multer({ storage }).single('file'));
  app.use('/api/admin/user', registerUser);
  app.use('/api/admin/questions', userQuestions);
  app.use('/api/admin/polls', managePolls);
  app.use('/api/user', user);
  app.use('/api/user/write', writingContent);
  app.use('/api/user/answers', personalAnswers);
  app.use('/api/user/vote', votings);
  app.use('/', welcome);
};
