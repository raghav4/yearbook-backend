const express = require('express');
const adminControlelr = require('../../controllers/admin.controller');

const router = express.Router();

// Route to login a user
router.post('/', adminControlelr.logInAdmin);

module.exports = router;
