const express = require('express');
const auth = require('../../middlewares/admin/auth');
const superAuth = require('../../middlewares/admin/superAuth');
const adminController = require('../../controllers/admin.controller');

const router = express.Router();

router.post('/register', [auth, superAuth], adminController.registerAdmin);

router.post('/grant', auth, adminController.grantAccess);

module.exports = router;
