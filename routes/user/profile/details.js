const express = require('express');

const router = express.Router();
const auth = require('../../../middlewares/auth');
const { User } = require('../../../models/user/userDetails');
const { validateUserInfo } = require('../../../utils/user/userInfo');

// Get all the registered Users

router.get('/', async (req, res) => {
  const user = await User.find({});
  if (!user.length) return res.status(404).send('DB is empty!');
  return res.send(user);
});

// LogIn User

router.post('/auth', auth, async (req, res) => {
  return res.header('x-auth-token', req.token).send('Login Successful');
});

router.post('/upload', (req, res) => {
  res.send(`Done Uploading ${req.file}`);
});

router.put('/:id', async (req, res) => {
  const { error } = validateUserInfo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User not found with the given id');
  user = await User.findByIdAndUpdate(
    req.params.id,
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
