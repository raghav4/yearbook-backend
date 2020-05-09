const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const login = require('../routes/login');
const signup = require('../routes/signup');
const info = require('../routes/user/info');
const storage = require('../utils/multer');
const welcome = require('../routes/welcome');
const answers = require('../routes/user/answers');
const messages = require('../routes/user/messages');
const grantAccess = require('../routes/admin/numberAccess');
const userQuestions = require('../routes/admin/questions');
const polls = require('../routes/admin/polls');
const resetPassword = require('../routes/reset');
const error = require('../middlewares/error');

module.exports = (app) => {
  app.use(
      cors({
        exposedHeaders : [ 'Content-Length', 'x-auth-token' ],
      }),
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended : true}));

  app.use(multer({storage}).single('file'));
  app.use('/api/user/login', login);
  app.use('/api/user/signup', signup);
  app.use('/api/user/info', info);
  app.use('/api/user/answers', answers);
  app.use('/api/user/messages', messages);
  app.use('/api/user/reset', resetPassword);
  app.use('/api/admin/grantaccess', grantAccess);
  app.use('/api/admin/questions', userQuestions);
  app.use('/api/admin/polls', polls);
  app.use('/', welcome);
  //  app.use(error);
};
