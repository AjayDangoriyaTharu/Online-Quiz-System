const express = require('express');
const { getQuestions, addQuestion, updateQuestion, deleteQuestion } = require('../controllers/questionController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:quizId', protect, getQuestions);
router.post('/', protect, adminOnly, addQuestion);
router.put('/:questionId', protect, adminOnly, updateQuestion);
router.delete('/:questionId', protect, adminOnly, deleteQuestion);

module.exports = router;
