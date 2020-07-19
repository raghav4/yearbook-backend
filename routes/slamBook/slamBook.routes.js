const express = require('express');
const {user} = require('../routes.json');
const {auth} = require('../../middlewares/user');
const {slamBookController} = require('../../controllers');
const {validateSlamBookAnswer} = require('../../validation');
const {validator, validateObjectId} = require('../../middlewares');

const router = express.Router();
const {answer} = user;

router.get(answer.getAllSelf, auth, slamBookController.answers);

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

// Route to get a particular Question for the user
router.get('/:id', [ validateObjectId ], slamBookController.getQuestionById);

// router.post(
//   '/',
//   [validator(validateQuestion)],
//   slamBookController.addSlamBookQuestion,
// );

// Route to delete the user Question
router.delete('/:id', [ validateObjectId ],
              slamBookController.deleteSlamBookQuestion);

module.exports = router;
