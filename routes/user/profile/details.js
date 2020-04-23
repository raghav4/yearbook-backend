/* eslint-disable no-underscore-dangle */
const express = require('express');
const bcrypt = require('bcryptjs');
const auth = require('../../../middlewares/auth');
const { User } = require('../../../models/user/userDetails');
const { validateUserInfo } = require('../../../utils/user');
const { LogInValidation } = require('../../../utils');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const users = await User.find({});
  if (!users.length) return res.status(404).send('No Users found in the DB');
  return res.send(users);
});

// LogIn User

router.post('/auth', async (req, res) => {
  const { error } = LogInValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send('No user exists with the given email account');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send('Invalid Password');

  // eslint-disable-next-line no-underscore-dangle
  const token = user.generateAuthToken();
  return res.header('x-auth-token', token).send('Login Successful');
});

router.post('/upload', (req, res) => {
  res.send(`Done Uploading ${req.file}`);
});

// Updating a user

router.put('/', auth, async (req, res) => {
  const { error } = validateUserInfo(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findById(req.user._id);
  if (!user) return res.status(404).send('User not found with the given id');
  user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      password: req.body.password || user.password,
      phoneNumber: req.body.phoneNumber || user.phoneNumber,
      dp: req.body.dp || user.dp,
      bio: req.body.bio || user.bio,
      department: req.body.department || user.department,
      section: req.body.section || user.section,
      whatsappNo: req.body.whatsappNo || user.whatsappNo,
      facebook: req.body.facebook || user.facebook,
      linkedin: req.body.linkedin || user.linkedin,
      Instagram: req.body.Instagram || user.Instagram,
    },
    {
      new: true,
    },
  );
  return res.status(200).send(user);
});

module.exports = router;
