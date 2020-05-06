const express = require('express');
const userController = require('../controllers');

const router = express.Router();

// Route to login a user
router.post('/', userController.loginUser);

module.exports = router;
