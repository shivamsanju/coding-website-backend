const express = require('express');
const {getAllQuestions, getStatus, setStatus} = require('../controllers/questions')
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route('/questions').get(isAuthenticatedUser,getAllQuestions);
router.route('/status').get(isAuthenticatedUser,getStatus).post(isAuthenticatedUser,setStatus);

module.exports = router;