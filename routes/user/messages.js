const express = require('express');
const {auth} = require('../../middlewares/user');
const {validator, validateObjectId} = require('../../middlewares');
const {validateMessage} = require('../../utils/user');
const userController = require('../../controllers/user/user.controller');

const router = express.Router();

// Route to get all the messages for the user
// router.get('/', auth, userController.getMessages);

// Route to get the message for the user with given id.

// router.get('/:id', [auth, validateObjectId], userController.getUserMessage);

// Route to add/update the user message
// router.put('/', [auth, validator(validateMessage)],
// userController.updateMessage);

// Route to delete the message for another user
// router.delete('/:id', [auth, validateObjectId],
// userController.deleteMessage);

module.exports = router;
