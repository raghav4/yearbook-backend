const experss = require('express');
const { validateQuestion } = require('../../validation/user');
const adminController = require('../../controllers/admin.controller');
const { auth } = require('../../middlewares/user');
const { validator, validateObjectId } = require('../../middlewares');

const router = experss.Router();

// Route to get all the Questions for the user, (to be answered by the user.)
router.get('/', auth, adminController.getUserQuestions);

// Route to get a particular Question for the user
router.get('/:id', [auth, validateObjectId], adminController.getSingleQuestion);

router.post('/', [auth, validator(validateQuestion)], adminController.addUserQuestion);

// Route to delete the user Question
router.delete('/:id', [auth, validateObjectId], adminController.deleteQuestion);

module.exports = router;
