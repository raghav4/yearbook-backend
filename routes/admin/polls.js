const express = require('express');
const { admin } = require('../routes.json');
const { validator } = require('../../middlewares');
const { auth } = require('../../middlewares/user');
const { adminAuth, superAuth } = require('../../middlewares/admin');
const { validatePollQuestion } = require('../../validation/admin');
const { adminUserController } = require('../../controllers/admin');

const router = express.Router();
const { poll } = admin;

// TODO: #21 req.user shouldn't be there for admin?

router.get(poll.all, adminUserController.getPollQuestions);

router.get(poll.byId, adminUserController.getPollQuestionById);

router.post(
  poll.add,
  [adminAuth, superAuth, validator(validatePollQuestion)],
  adminUserController.createPollQuestion,
);

router.delete(
  poll.remove,
  [adminAuth, superAuth],
  adminUserController.deletePollQuestion,
);

module.exports = router;
