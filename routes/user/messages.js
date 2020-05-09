const express = require('express');
const auth = require('../../middlewares/auth');
const validator = require('../../middlewares/validator');
const validateObjectId = require('../../middlewares/validateObjectId');
const { validateMessage } = require('../../utils/user/message');
const userController = require('../../controllers/user.controller');

const router = express.Router();

// Route to get all the messages for the user
router.get('/', auth, userController.getMessages);

// Route to get the message for the user with given id.

router.get('/:id', [auth, validateObjectId], userController.getUserMessage);

// Route to write a message for another user
router.post(
  '/',
  [auth, validator(validateMessage)],
  userController.writeMessage,
);

// Route to update the user message
router.put(
  '/',
  [auth, validator(validateMessage)],
  userController.updateMessage,
);

// Route to delete the message for another user
router.delete('/:id', [auth, validateObjectId], userController.deleteMessage);

module.exports = router;
