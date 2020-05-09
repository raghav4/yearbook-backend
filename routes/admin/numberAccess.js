const express = require('express');
const { AllowedUsers } = require('../../models/grantAccess');
const auth = require('../../middlewares/auth');
const isAdmin = require('../../middlewares/admin');

const router = express.Router();

router.post('/', async (req, res) => {
  const user = new AllowedUsers({
    phoneNumber: req.body.phoneNumber,
  });
  await user.save();
  return res.status(200).send('Added Number');
});

module.exports = router;
