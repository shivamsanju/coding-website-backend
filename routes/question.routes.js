const express = require('express');
const {getAllQuestions, getStatus, setStatus} = require('../controllers/questions')

const router = express.Router();

router.route('/questions').get(getAllQuestions);
router.route('/status').get(getStatus).post(setStatus);

module.exports = router;