const express = require('express');
const {user} = require('../routes.json');
const {slamBookController} = require('../../controllers');
const {validateSlamBookAnswer} = require('../../validation');
const {
  auth,
  validator,
  validateObjectId,
  adminAuth,
} = require('../../middlewares');

const router = express.Router();
const {answer} = user;

router.get(answer.getAllSelf, auth, slamBookController.allAnswers);

router.put(
    answer.addOrUpdate,
    [ auth, validator(validateSlamBookAnswer) ],
    slamBookController.upsertAnswer,
);

router.delete(
    answer.deleteById,
    [ auth, validateObjectId ],
    slamBookController.deleteAnswer,
);

router.get('/', slamBookController.getAllSlamBookQuestions);

// !! SlamBooks Question Routes to be handled only by the admin

// ? Conditionally handle the middleware

// Route to get a particular Question for the user
router.get('/:id', [ auth, validateObjectId ],
           slamBookController.getQuestionById);

router.post('/', [ auth, adminAuth ], slamBookController.addSlamBookQuestion);

// Route to delete the user Question
router.delete(
    '/:id',
    [ auth, adminAuth, validateObjectId ],
    slamBookController.deleteSlamBookQuestion,
);

module.exports = router;
