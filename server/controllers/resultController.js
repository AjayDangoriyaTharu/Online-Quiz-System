const QuizAttempt  = require('../models/QuizAttempt');
const Answer       = require('../models/Answer');
const calculateScore = require('../utils/calculateScore');
const asyncHandler = require('../utils/asyncHandler');

// POST /api/results/submit
const submitQuiz = asyncHandler(async (req, res) => {
  const { quizId, answers } = req.body;

  if (!quizId || !answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'quizId and answers are required' });
  }

  const existing = await QuizAttempt.findOne({ userId: req.user._id, quizId });
  if (existing) {
    return res.status(400).json({ error: 'You have already attempted this quiz' });
  }

  const { score, totalQuestions, percentage, answerResults } = await calculateScore(quizId, answers);

  const attempt = await QuizAttempt.create({
    userId: req.user._id,
    quizId,
    score,
    totalQuestions,
    percentage,
    submittedAt: new Date(),
  });

  await Answer.insertMany(
    answerResults.map(a => ({ ...a, attemptId: attempt._id }))
  );

  res.json({ score, totalQuestions, percentage });
});

// GET /api/results/user/:userId
const getUserResults = asyncHandler(async (req, res) => {
  const results = await QuizAttempt.find({ userId: req.params.userId })
    .populate('quizId', 'title')
    .sort({ submittedAt: -1 });
  res.json(results);
});

// GET /api/results/all  [admin]
const getAllResults = asyncHandler(async (req, res) => {
  const results = await QuizAttempt.find()
    .populate('userId', 'name email')
    .populate('quizId', 'title')
    .sort({ submittedAt: -1 });
  res.json(results);
});

// GET /api/results/leaderboard/:quizId
const getLeaderboard = asyncHandler(async (req, res) => {
  const results = await QuizAttempt.find({ quizId: req.params.quizId })
    .populate('userId', 'name')
    .sort({ score: -1 })
    .limit(10);

  const leaderboard = results.map((r, i) => ({
    rank: i + 1,
    userName: r.userId?.name || 'Unknown',
    score: r.score,
  }));

  res.json(leaderboard);
});

module.exports = { submitQuiz, getUserResults, getAllResults, getLeaderboard };
