const bcrypt = require('bcryptjs');
const debug = require('debug')('app:controller/admin/onboarding');
const {Admin} = require('../../models');

exports.logInAdmin = async (req, res) => {
  debug('Function : logInAdmin(), Purpose : Route to login in an Admin');
  const {username, password} = req.body;

  const admin = await Admin.findOne({username});
  if (!admin)
    return res.status(400).send('Invalid username or password');

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword)
    return res.status(401).send('Invalid username or Password');

  const token = admin.generateAuthToken();
  return res.header('x-auth-token', token).send('Login Successful');
};

exports.registerAdmin = async (req, res) => {
  debug('Function : registerAdmin(), Purpose : Route to register an Admin');
  if (!req.admin.isSuperAdmin)
    return res.status(401).send('Access Denied!');

  const {username, password} = req.body;
  const admin = new Admin({username, password});

  try {
    const salt = await bcrypt.genSalt(15);
    admin.password = await bcrypt.hash(admin.password, salt);
    await admin.save();
  } catch (ex) {
    debug(ex);
    return res.status(500).send('Something failed..');
  }
  await admin.save();
  return res.status(200).send(admin);
};
