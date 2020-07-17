const express = require('express');
const {adminOnBoardingController} = require('../../controllers');

const router = express.Router();

router.post('/', adminOnBoardingController.logInAdmin);

router.post('/', adminOnBoardingController.registerAdmin);

module.exports = router;
