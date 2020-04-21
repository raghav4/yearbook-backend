const bcrypt = require('bcryptjs');
const { User } = require('../models/user/userDetails');
const { validateCredentials } = require('../utils/user/login');

module.exports = async (req, res, next) => {
  const { error } = validateCredentials(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('No user exists with the given email account');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send('Invalid Password');

  // do the cookie stuff or whatever
  // eslint-disable-next-line no-underscore-dangle
  const token = user.generateAuthToken();
  req.token = token;
  req.user = user;
  return next();
};
