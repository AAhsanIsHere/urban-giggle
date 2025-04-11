const mongoose = require('mongoose');

// Define the Question Schema
const QuestionSchema = new mongoose.Schema({
  id: String,
  text: String,
  answer: String,
});

// Define the Passage Schema
const PassageSchema = new mongoose.Schema({
  title: String,
  text: String,
  questions: [QuestionSchema],
});

// Check if the Passage model already exists in mongoose.models to avoid recompiling
const Passage = mongoose.models.Passage || mongoose.model('Passage', PassageSchema);

module.exports = Passage;