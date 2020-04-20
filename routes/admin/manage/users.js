const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../../../models/user/userDetails');
const { validateRegisteration } = require('../../../utils/admin/signup');

/**
 * Route to add/register a user to the DB.
 */
router.post('/', async (req, res) => {
  const { error } = validateRegisteration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // TODO #6: Do not sign up user if the user is signed up already
  let user = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (!user) return res.status(400).send('Invalid Mobile Number');

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    // department: req.body.department,
    // section: req.body.section,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  return res.status(200).send('Successfully added User!');
});

module.exports = router;
