const Quiz        = require('../models/Quiz');
const asyncHandler = require('../utils/asyncHandler');

// GET /api/quizzes
const getQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find().sort({ createdAt: -1 });
  res.json(quizzes.map(q => ({ ...q.toObject(), pin: undefined, hasPin: !!q.pin })));
});

// GET /api/quizzes/:quizId
const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId).select('-pin');
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  res.json(quiz);
});

// POST /api/quizzes  [admin]
const createQuiz = asyncHandler(async (req, res) => {
  const { title, description, timeLimit, pin } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const quiz = await Quiz.create({
    title,
    description,
    timeLimit: timeLimit || 0,
    pin: pin || null,
    createdBy: req.user._id,
  });

  res.status(201).json({ message: 'Quiz created successfully', quiz });
});

// POST /api/quizzes/:quizId/verify-pin
const verifyPin = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.quizId);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  if (!quiz.pin) return res.json({ success: true });
  if (req.body.pin !== quiz.pin) return res.status(401).json({ error: 'Incorrect PIN' });
  res.json({ success: true });
});

// PUT /api/quizzes/:quizId  [admin]
const updateQuiz = asyncHandler(async (req, res) => {
  // Prevent overwriting totalQuestions via update
  delete req.body.totalQuestions;

  const quiz = await Quiz.findByIdAndUpdate(req.params.quizId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  res.json({ message: 'Quiz updated successfully', quiz });
});

// DELETE /api/quizzes/:quizId  [admin]
const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findByIdAndDelete(req.params.quizId);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  res.json({ message: 'Quiz deleted successfully' });
});

module.exports = { getQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz, verifyPin };
