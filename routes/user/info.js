const express = require('express');
const auth = require('../../middlewares/auth');
const { validateUserInfo } = require('../../utils/user');
const { User } = require('../../models/user');

const router = express.Router();

/*
 * Route to GET a user
 */
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send('User not found');

  return res.status(200).send(user);
});

/*
 * Route to UPDATE the Details of the user.
 * TODO #12: Disable some fields to be updated by the user.
 */

router.put('/', auth, async (req, res) => {
  const { error } = validateUserInfo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.user._id);
  if (!user) return res.status(404).send('User not found');

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
