const express = require('express');
const Controller = require('../controllers');

const router = express.Router();

// Route to login a user
router.post('/user/login', Controller.userLogIn);

// Route to signup a user
router.post('/user/signup', Controller.userSignUp);

// Route to get the logged in user
// router.get('/user', Controller)

// Route to get all the others users of the logged in user class.
router.get('/users/class', Controller.getAllUsersOfAClass);

// Route to get all the users
router.get('/users/all', Controller.getAllUsers);

// Route to update the user details/metadata
router.patch('/user/update', Controller.updateUserDetails);

/**
 * SLAMBOOK ANSWERS
 */

// Route to get all the answers of the logged-in user.
router.get('/answers', Controller.getAllAnswersOfAUser);

// Route to upsert (Add/Update) an answer for the logged-in user.
router.post('/answer/new', Controller.upsertAnswer);

// Route to delete an answer for the logged-in user.
router.delete('/answer/delete/:id', Controller.deleteAnswer);

/**
 * MESSAGES
 */
// Route to get all the received messages
router.get('/messages', Controller.getAllReceivedMessages);

// Route to get a Message by receiverId
router.get('/message/:id', Controller.getMessageByReceiverId);

// Route to update a message
router.put('/message/new', Controller.updateMessage);

// Route to delete a message
router.delete('/message/delete/:id', Controller.deleteMessage);

/**
 * SLAMBOOK QUESTIONS
 */

// Route to get all slambook questions
router.get('/questions/all', Controller.getAllSlambookQuestions);

// Route to get a question by id.
router.get('/question/:id', Controller.getSlambookQuestionById);

// Route to create a new question.
router.post('/question/new', Controller.createSlambookQuestion);

// Route to delete a question
router.delete('/question/delete/:id', Controller.deleteSlambookQuestion);

/**
 * POLLS
 */

// Route to get a poll by id
router.get('/poll/:id', Controller.getPollById);

// Route to get all polls
router.get('/polls/all', Controller.getAllPolls);

// Route to create a new poll
router.post('/poll/new', Controller.createPoll);

// Route to delete a poll by pollId
router.delete('/poll/delete/:id', Controller.deletePoll);

module.exports = router;
