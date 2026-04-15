const express = require('express');
const { submitQuiz, getUserResults, getAllResults, getLeaderboard } = require('../controllers/resultController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/submit', protect, submitQuiz);
router.get('/user/:userId', protect, getUserResults);
router.get('/all', protect, adminOnly, getAllResults);
router.get('/leaderboard/:quizId', protect, getLeaderboard);

module.exports = router;
