// eslint-disable-next-line import/newline-after-import
const express = require('express');
const router = express.Router();
const { User, validatePut } = require('../../../models/user/userDetails');

router.get('/', async (req, res) => {
  const user = await User.find({});
  if (!user.length) return res.status(404).send('DB is empty!');
  res.send(user);
});

router.post('/upload', (req, res) => {
  res.send(`Done Uploading ${req.file}`);
});

router.put('/:id', async (req, res) => {
  const { error } = validatePut(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.params.id);
  user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name || user.name,
      dp: req.body.dp || user.dp,
      bio: req.body.bio || user.bio,
      department: req.body.department || user.department,
      section: req.body.section || user.section,
      whatsappNo: req.body.whatsappNo || user.whatsappNo,
      facebook: req.body.facebook || user.facebook,
      linkedin: req.body.linkedin || user.linkedin,
      email: req.body.email || user.email,
    },
    { new: true },
  );
  if (!user) return res.status(404).send('User not found with the given id');
  return res.status(200).send(user);
});

module.exports = router;
