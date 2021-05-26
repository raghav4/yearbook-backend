const express = require('express');
const Controller = require('../controllers');
const Validation = require('../validation');
const validator = require('../middlewares/validator');
const { userAuth, validateObjectId } = require('../middlewares');

const router = express.Router();

// Route to login a user
router.post('/user/login', validator(Validation.login), Controller.userLogIn);

// Route to signup a user
router.post('/user/signup', validator(Validation.signup), Controller.userSignUp);

// Route to get the logged in user
// router.get('/user', Controller)

// Route to get all the others users of the logged in user class.
router.get('/users/class', userAuth, Controller.getAllUsersOfAClass);

// Route to get all the users
router.get('/users/all', userAuth, Controller.getAllUsers);

// Route to update the user details/metadata
router.patch('/user/update', Controller.updateUserDetails);

/**
 * SLAMBOOK ANSWERS
 */

// Route to get all the answers of the logged-in user.
router.get('/answers', userAuth, Controller.getAllAnswersOfAUser);

// Route to upsert (Add/Update) an answer for the logged-in user.
router.post('/answer/new', [userAuth, validator(Validation.answer)], Controller.upsertAnswer);

// Route to delete an answer for the logged-in user.
router.delete('/answer/delete/:id', [userAuth, validateObjectId], Controller.deleteAnswer);

/**
 * MESSAGES
 */
// Route to get all the received messages
router.get('/messages', userAuth, Controller.getAllReceivedMessages);

// Route to get a Message by receiverId
router.get('/message/:id', [userAuth, validateObjectId], Controller.getMessageByReceiverId);

// Route to update a message
router.put('/message/new', [userAuth, validator(Validation.message)], Controller.updateMessage);

// Route to delete a message
router.delete('/message/delete/:id', [userAuth, validateObjectId], Controller.deleteMessage);

/**
 * SLAMBOOK QUESTIONS
 */

// Route to get all slambook questions
router.get('/questions/all', userAuth, Controller.getAllSlambookQuestions);

// Route to get a question by id.
router.get('/question/:id', [userAuth, validateObjectId], Controller.getSlambookQuestionById);

// Route to create a new question.
router.post('/question/new', [userAuth, validator(Validation.title)], Controller.createSlambookQuestion);

// Route to delete a question
router.delete('/question/delete/:id', [userAuth, validateObjectId], Controller.deleteSlambookQuestion);

/**
 * POLLS
 */

// Route to get a poll by id
router.get('/poll/:id', [userAuth, validateObjectId], Controller.getPollById);

// Route to get all polls
router.get('/polls/all', userAuth, Controller.getAllPolls);

// Route to create a new poll
router.post('/poll/new', [userAuth, validator(Validation.title)], Controller.createPoll);

// Route to delete a poll by pollId
router.delete('/poll/delete/:id', [userAuth, validateObjectId], Controller.deletePoll);

module.exports = router;
