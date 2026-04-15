const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title:          { type: String, required: true, trim: true },
  description:    { type: String, trim: true, default: '' },
  createdBy:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timeLimit:      { type: Number, default: 0, min: 0 },
  totalQuestions: { type: Number, default: 0, min: 0 },
  pin:            { type: String, default: null },
}, { timestamps: true });

quizSchema.index({ createdBy: 1 });

module.exports = mongoose.model('Quiz', quizSchema);
