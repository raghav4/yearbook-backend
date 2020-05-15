const express = require('express');
const { adminAuth, superAuth } = require('../../middlewares/admin');
const adminController = require('../../controllers/admin.controller');

const router = express.Router();

router.post('/register', [adminAuth, superAuth], adminController.registerAdmin);

router.post('/grant', adminAuth, adminController.grantAccess);

module.exports = router;
