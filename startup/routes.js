const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const login = require('../routes/login');
const signup = require('../routes/signup');
const info = require('../routes/user/info');
const answers = require('../routes/user/answers');
const messages = require('../routes/user/messages');
const grantAccess = require('../routes/admin/numberAccess');
const storage = require('../utils/multer');
const welcome = require('../routes/welcome');
const error = require('../middlewares/error');

module.exports = (app) => {
  app.use(
    cors({
      exposedHeaders: ['Content-Length', 'x-auth-token'],
    }),
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(multer({ storage }).single('file'));
  app.use('/api/login', login);
  app.use('/api/signup', signup);
  app.use('/api/user/info', info);
  app.use('/api/user/answers', answers);
  app.use('/api/user/messages', messages);
  app.use('/api/admin/grantaccess', grantAccess);
  app.use('/', welcome);
  app.use(error);
};
