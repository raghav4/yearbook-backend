const express = require('express');
const { user } = require('../routes.json');
const { auth } = require('../../middlewares/user');
const { validateUserAnswer } = require('../../validation/user');
const { validator, validateObjectId } = require('../../middlewares');
const { answerController } = require('../../controllers');

const router = express.Router();
const { answer } = user;

router.get(answer.getAllSelf, auth, answerController.answers);

router.put(
  answer.addOrUpdate,
  [auth, validator(validateUserAnswer)],
  answerController.upsertAnswer,
);

router.delete(
  answer.deleteById,
  [auth, validateObjectId],
  answerController.deleteAnswer,
);

module.exports = router;
