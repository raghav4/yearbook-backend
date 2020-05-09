const experss = require('express');
const {validateQuestion} = require('../../utils/user');
const adminController = require('../../controllers/admin.controller');
const validator = require('../../middlewares/validator');
const validateObjectId = require('../../middlewares/validateObjectId');
const auth = require('../../middlewares/auth');

const router = experss.Router();

// Route to get all the Questions for the user, (to be answered by the user.)
router.get('/', auth, adminController.getUserQuestions);

// Route to get a particular Question for the user
router.get('/:id', [ auth, validateObjectId ],
           adminController.getSingleQuestion);

router.post(
    '/',
    [ auth, validator(validateQuestion) ],
    adminController.addUserQuestion,
);

// Route to delete the user Question
router.delete('/:id', [ auth, validateObjectId ],
              adminController.deleteQuestion);

module.exports = router;
