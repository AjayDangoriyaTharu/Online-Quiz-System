const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  attemptId:      { type: mongoose.Schema.Types.ObjectId, ref: 'QuizAttempt', required: true },
  questionId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Question',    required: true },
  selectedOption: { type: String, default: null },
  isCorrect:      { type: Boolean, required: true },
});

answerSchema.index({ attemptId: 1 });

module.exports = mongoose.model('Answer', answerSchema);
