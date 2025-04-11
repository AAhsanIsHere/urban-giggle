// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Parse incoming JSON data

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Mongoose Schemas
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

const Passage = mongoose.model('Passage', PassageSchema);

// Routes
// Home Route (Test)
app.get('/', (req, res) => {
  res.send('IELTS Mock Test Backend is running!');
});

// Get all passages (Public Route)
app.get('/api/passages', async (req, res) => {
  try {
    const passages = await Passage.find();
    res.json(passages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch passages' });
  }
});

// Admin Routes (to upload new passages)
const adminRoutes = require('./routes/admin');  // Assuming you have a separate admin route handler
app.use('/admin', adminRoutes);

// Upload a new passage (Admin Route)
app.post('/api/passages', async (req, res) => {
  try {
    const newPassage = new Passage(req.body);
    await newPassage.save();
    res.status(201).json(newPassage);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save passage' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});