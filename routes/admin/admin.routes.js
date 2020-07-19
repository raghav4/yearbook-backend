const express = require('express');
const { adminAuth } = require('../../middlewares/admin');
const { userAccessController } = require('../../controllers');
const { adminOnBoardingController } = require('../../controllers');

const router = express.Router();

router.post('/', adminOnBoardingController.logInAdmin);

// * No need of registering an admin, it will be done on the machine only.
// router.post('/', adminOnBoardingController.registerAdmin);

router.post('/grant', adminAuth, userAccessController.grantAccess);

module.exports = router;
