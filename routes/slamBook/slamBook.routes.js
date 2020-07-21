const express = require('express');
const { slamBook } = require('../routes.json');
const { slamBookController } = require('../../controllers');
const {
  validateSlamBookAnswer,
  validateSlamBookQuestion,
} = require('../../validation');
const {
  auth,
  validator,
  validateObjectId,
  adminAuth,
} = require('../../middlewares');

const router = express.Router();

router.get(slamBook.getUserAnswers, auth, slamBookController.userAnswers);

router.get(slamBook.allQuestions, auth, slamBookController.getAllSlamBookQuestions);

router.get(
  slamBook.getQuestionById,
  [auth, validateObjectId],
  slamBookController.getQuestionById,
);

router.post(
  slamBook.createQuestion,
  [auth, adminAuth, validator(validateSlamBookQuestion)],
  slamBookController.addSlamBookQuestion,
);

router.put(
  slamBook.upsertAnswer,
  [auth, validator(validateSlamBookAnswer)],
  slamBookController.upsertAnswer,
);

router.delete(
  slamBook.deleteAnswerById,
  [auth, validateObjectId],
  slamBookController.deleteAnswerById,
);

router.delete(
  slamBook.deleteQuestionById,
  [auth, adminAuth, validateObjectId],
  slamBookController.deleteSlamBookQuestion,
);

module.exports = router;
