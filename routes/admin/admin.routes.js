const express = require('express');
const {adminAuth, superAuth} = require('../../middlewares/admin');
const adminController = require('../../controllers/admin.controller');
const userAcessController = require('../../controllers/userAcess.controller');

const router = express.Router();

router.post('/register', [ adminAuth, superAuth ],
            adminController.registerAdmin);

router.post('/grant', adminAuth, userAcessController.grantAccess);

module.exports = router;
