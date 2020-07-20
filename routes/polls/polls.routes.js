const express = require('express');
const { admin } = require('../routes.json');
const { validatePoll } = require('../../validation');
const { pollController } = require('../../controllers');
const { validator, auth } = require('../../middlewares');

const router = express.Router();
// const { poll } = admin;

// // TODO: #21 req.user shouldn't be there for admin?

// router.get(poll.all, pollController.getAllPolls);

// router.get(poll.byId, pollController.getPollById);

// router.post(poll.add, [auth, validator(validatePoll)], pollController.createPoll);

// router.delete(poll.remove, [auth], pollController.deletePoll);

module.exports = router;
