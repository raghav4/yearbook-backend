const express = require('express');
const { admin } = require('../routes.json');
const { validator } = require('../../middlewares');
const { auth } = require('../../middlewares/user');
const { adminAuth, superAuth } = require('../../middlewares/admin');
const { validatePoll } = require('../../validation');
const { pollController } = require('../../controllers');

const router = express.Router();
const { poll } = admin;

// TODO: #21 req.user shouldn't be there for admin?

router.get(poll.all, pollController.getAllPolls);

router.get(poll.byId, pollController.getPollById);

router.post(
  poll.add,
  [adminAuth, superAuth, validator(validatePoll)],
  pollController.createPoll,
);

router.delete(poll.remove, [adminAuth, superAuth], pollController.deletePoll);

module.exports = router;
