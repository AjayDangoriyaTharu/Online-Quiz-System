const Question    = require('../models/Question');
const Quiz        = require('../models/Quiz');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/questions/:quizId
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({ quizId: req.params.quizId })
    .select('-correctAnswer')
    .sort({ createdAt: 1 });
  res.json(questions);
});

// POST /api/questions  [admin]
const addQuestion = asyncHandler(async (req, res) => {
  const { quizId, questionText, options, correctAnswer } = req.body;

  if (!quizId || !questionText || !options || !correctAnswer) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (!Array.isArray(options) || options.length !== 4) {
    return res.status(400).json({ error: 'Exactly 4 options are required' });
  }
  if (!options.includes(correctAnswer)) {
    return res.status(400).json({ error: 'correctAnswer must match one of the options' });
  }

  const question = await Question.create({ quizId, questionText, options, correctAnswer });
  await Quiz.findByIdAndUpdate(quizId, { $inc: { totalQuestions: 1 } });

  res.status(201).json({ message: 'Question added successfully', question });
});

// PUT /api/questions/:questionId  [admin]
const updateQuestion = asyncHandler(async (req, res) => {
  const { options, correctAnswer } = req.body;

  if (options && correctAnswer && !options.includes(correctAnswer)) {
    return res.status(400).json({ error: 'correctAnswer must match one of the options' });
  }

  const question = await Question.findByIdAndUpdate(
    req.params.questionId,
    req.body,
    { new: true, runValidators: true }
  );
  if (!question) return res.status(404).json({ error: 'Question not found' });

  res.json({ message: 'Question updated successfully', question });
});

// DELETE /api/questions/:questionId  [admin]
const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findByIdAndDelete(req.params.questionId);
  if (!question) return res.status(404).json({ error: 'Question not found' });

  await Quiz.findByIdAndUpdate(question.quizId, { $inc: { totalQuestions: -1 } });

  res.json({ message: 'Question deleted successfully' });
});

module.exports = { getQuestions, addQuestion, updateQuestion, deleteQuestion };
