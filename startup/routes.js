const bodyParser = require('body-parser');
const user = require('../routes/user/userInfo');
const userQuestions = require('../routes/admin/createQuestion');
const personalAnswers = require('../routes/user/personalAnswers');
const writingContent = require('../routes/writeAbout');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use('/api/user', user);
  app.use('/api/question', userQuestions);
  app.use('/api/answer', personalAnswers);
  app.use('/api/write', writingContent);
};
