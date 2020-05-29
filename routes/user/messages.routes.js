const express = require('express');
const { user } = require('../routes.json');
const { auth } = require('../../middlewares/user');
const { validateMessage } = require('../../validation/user');
const { validator, validateObjectId } = require('../../middlewares');
const { userMessageController } = require('../../controllers/user');

const router = express.Router();
const { message } = user;

router.get(message.getAllOfUser, auth, userMessageController.getMessages);

router.get(
  message.getById,
  [auth, validateObjectId],
  userMessageController.getMessageById,
);

router.put(
  message.addOrUpdate,
  [auth, validator(validateMessage)],
  userMessageController.upsertMessage,
);

router.delete(
  message.deleteById,
  [auth, validateObjectId],
  userMessageController.deleteMessage,
);

module.exports = router;
