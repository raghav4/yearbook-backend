const express = require('express');

const router = express.Router();
const {User, validatePost} = require('../../../models/user/userDetails');

/**
 * Route to add/register a user to the DB.
 */
router.post('/', async (req, res) => {
  const {error} = validatePost(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  const user = new User({
    name : req.body.name,
    department : req.body.department,
    section : req.body.section,
    phoneNumber : req.body.phoneNumber,
  });
  await user.save();
  return res.status(200).send('Successfully added User!');
});

module.exports = router;
