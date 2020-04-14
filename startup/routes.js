const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const user = require('../routes/user/profile/details');
const userQuestions = require('../routes/admin/createQuestion');
const personalAnswers = require('../routes/user/questions/self');
const writingContent = require('../routes/user/questions/others');
const managePolls = require('../routes/admin/createPolls');
const votings = require('../routes/user/polls');
const storage = require('../routes/utils/multer');
const welcome = require('../routes/welcome');

// eslint-disable-next-line func-names
module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(multer({storage}).single('file'));
  app.use('/api/user', user);
  app.use('/api/user/write', writingContent);
  app.use('/api/admin/questions', userQuestions);
  app.use('/api/admin/polls', managePolls);
  app.use('/api/user/vote', votings);
  app.use('/api/answer', personalAnswers);
  app.use('/', welcome);
};
