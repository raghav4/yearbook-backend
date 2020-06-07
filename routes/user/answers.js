const express = require('express');
const { user } = require('../routes.json');
const { auth } = require('../../middlewares/user');
const { validateUserAnswer } = require('../../validation/user');
const { validator, validateObjectId } = require('../../middlewares');
const { userAnswerController } = require('../../controllers/user');

const router = express.Router();
const { answer } = user;

router.get(answer.getAllSelf, auth, userAnswerController.allAnswered);

router.put(
  answer.addOrUpdate,
  [auth, validator(validateUserAnswer)],
  userAnswerController.addUpdateAnswer,
);

router.delete(
  answer.deleteById,
  [auth, validateObjectId],
  userAnswerController.deleteAnswer,
);

module.exports = router;
