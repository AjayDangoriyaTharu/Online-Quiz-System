const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quizId:        { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  questionText:  { type: String, required: true, trim: true },
  options:       { type: [String], required: true },
  correctAnswer: { type: String, required: true },
}, { timestamps: true });

questionSchema.index({ quizId: 1 });

module.exports = mongoose.model('Question', questionSchema);
