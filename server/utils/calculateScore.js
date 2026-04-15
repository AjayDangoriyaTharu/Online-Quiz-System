const Question = require('../models/Question');

const calculateScore = async (quizId, userAnswers) => {
  const questions = await Question.find({ quizId });
  let score = 0;

  const answerResults = questions.map(q => {
    const selected = userAnswers[q._id.toString()];
    const isCorrect = selected === q.correctAnswer;
    if (isCorrect) score++;
    return { questionId: q._id, selectedOption: selected || null, isCorrect };
  });

  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  return { score, totalQuestions, percentage, answerResults };
};

module.exports = calculateScore;
