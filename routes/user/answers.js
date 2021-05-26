const express = require('express');
// const { auth } = require('../../middlewares/user');
// const { validator, validateObjectId } = require('../../middlewares');
// const { validateUserAnswer } = require('../../utils/user');
// const { userAnswerController } = require('../../controllers/user');

const router = express.Router();

// Route to get the answered self questions by the user
// router.get('/', auth, userAnswerController.allAnswered);

// Route to add/update an exising answer of a user (Self)
// router.put(
//   '/',
//   [auth, validator(validateUserAnswer)],
//   userAnswerController.addUpdateAnswer,
// );

// Route to delete self answer
// router.delete('/:id', [auth, validateObjectId],
// userAnswerController.deleteAnswer);

module.exports = router;
