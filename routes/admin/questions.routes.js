const experss = require('express');
const { validateQuestion } = require('../../validation/user');
const adminController = require('../../controllers/admin.controller');
const { adminAuth } = require('../../middlewares/admin');
const { validator, validateObjectId } = require('../../middlewares');

const router = experss.Router();

// Route to get all the Questions for the user, (to be answered by the user.)
router.get('/', adminController.getUserQuestions);

// Route to get a particular Question for the user
router.get('/:id', [validateObjectId], adminController.getSingleQuestion);

router.post('/', [validator(validateQuestion)], adminController.addUserQuestion);

// Route to delete the user Question
router.delete('/:id', [validateObjectId], adminController.deleteQuestion);

module.exports = router;
