const express = require('express');
const auth = require('../../middlewares/auth');
const userController = require('../../controllers/user.answer.controller');
const validateObjectId = require('../../middlewares/validateObjectId');
const validator = require('../../middlewares/validator');
const { validateUserAnswer } = require('../../utils/user/answer');

const router = express.Router();

// Route to get the answered self questions by the user
router.get('/', auth, userController.allAnswered);

// Route to add/update an exising answer of a user (Self)
router.put(
  '/',
  [auth, validator(validateUserAnswer)],
  userController.updateAnswer,
);

// Route to delete self answer
router.delete('/:id', [auth, validateObjectId], userController.deleteAnswer);

module.exports = router;
