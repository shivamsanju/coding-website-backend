const express = require('express');
const {
  getAllQuestions,
  getStatus,
  setStatus,
  setNotes,
  getLeaderBoard,
} = require('../controllers/questions');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

router.route('/questions').get(isAuthenticatedUser, getAllQuestions);
router
  .route('/status')
  .get(isAuthenticatedUser, getStatus)
  .post(isAuthenticatedUser, setStatus);
router.route('/notes').post(isAuthenticatedUser, setNotes);
router.route('/leaderboard').get(isAuthenticatedUser, getLeaderBoard);

module.exports = router;
