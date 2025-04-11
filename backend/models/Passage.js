const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  id: String,
  text: String,
  answer: String,
});

const PassageSchema = new mongoose.Schema({
  title: String,
  text: String,
  questions: [QuestionSchema],
});

// Check if model already exists, to prevent overwriting
const Passage = mongoose.models.Passage || mongoose.model('Passage', PassageSchema);

module.exports = Passage;
