const express = require('express');
const { getQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz, verifyPin } = require('../controllers/quizController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getQuizzes);
router.get('/:quizId', protect, getQuizById);
router.post('/', protect, adminOnly, createQuiz);
router.post('/:quizId/verify-pin', protect, verifyPin);
router.put('/:quizId', protect, adminOnly, updateQuiz);
router.delete('/:quizId', protect, adminOnly, deleteQuiz);

module.exports = router;
