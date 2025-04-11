// backend/models/Passage.js

const mongoose = require("mongoose");

// Define the Question schema (each question has text and answer)
const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },  // Question text
  answer: { type: String, required: true }  // Correct answer
});

// Define the Passage schema (each passage has a title, text, and an array of questions)
const passageSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Passage title
  text: { type: String, required: true },  // Passage content
  questions: [questionSchema]  // Array of questions related to this passage
});

// Create and export the Passage model
const Passage = mongoose.model("Passage", passageSchema);
module.exports = Passage;