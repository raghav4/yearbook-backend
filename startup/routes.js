const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const user = require('../routes/user/userInfo');
const userQuestions = require('../routes/admin/createQuestion');
const personalAnswers = require('../routes/user/selfAnswers');
const writingContent = require('../routes/messageWrite');
const storage = require('../routes/multer');

// eslint-disable-next-line func-names
module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(multer({ storage }).single('file'));
  app.use('/api/user', user);
  app.use('/api/question', userQuestions);
  app.use('/api/answer', personalAnswers);
  app.use('/api/write', writingContent);
};
