const express = require('express');
const auth = require('../../middlewares/adminAuth');
const adminController = require('../../controllers/admin.controller');

const router = express.Router();

router.post('/register', auth, adminController.registerAdmin);

module.exports = router;
