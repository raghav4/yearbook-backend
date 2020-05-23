const express = require('express');
const userController = require('../../controllers/user/user.controller');
const { validator } = require('../../middlewares');
const { validateSignUp } = require('../../utils/common');

const router = express.Router();

router.post('/', validator(validateSignUp), userController.validateSignUpAccess);

router.post('/verify', [validator(validateSignUp, true)], userController.verifySignUp);

module.exports = router;
