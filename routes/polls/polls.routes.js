/* eslint-disable no-unused-vars */
const express = require('express');
const { poll } = require('../routes.json');
const { validatePoll } = require('../../validation');
const { pollController } = require('../../controllers');
const {
  auth,
  adminAuth,
  validator,
  validateObjectId,
} = require('../../middlewares');

const router = express.Router();

router.get(poll.getAllPolls, pollController.getAllPolls);

router.get(poll.getPollById, [auth, validateObjectId], pollController.getPollById);

router.post(
  poll.createPollTitle,
  [auth, adminAuth, validator(validatePoll)],
  pollController.createPoll,
);

router.delete(
  poll.deletePollById,
  [auth, adminAuth, validateObjectId],
  pollController.deletePoll,
);

module.exports = router;
