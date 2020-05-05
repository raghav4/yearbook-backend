const express = require('express');
const bcrypt = require('bcryptjs');
const { LogInValidation } = require('../utils');
const { User } = require('../models/user');

const router = express.Router();

/**
 * Route to Login : A USER/ADMIN
 * A User or the Admin is supposed to login in at least once.
 */
router.post('/', async (req, res) => {
  const { error } = LogInValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send('No user exists with the given email account');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send('Invalid Password');

  const token = user.generateAuthToken();
  return res.header('x-auth-token', token).send('Login Successful');
});

module.exports = router;
