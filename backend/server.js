const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Passage = require('./models/Passage');  // Import Passage model
const Test = require('./models/Test');        // Import Test model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('IELTS Mock Test Backend is running!');
});

// Get all passages
app.get('/api/passages', async (req, res) => {
  try {
    const passages = await Passage.find();  // Fetch all passages from the database
    res.json(passages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch passages' });
  }
});

// Upload a new passage (for admin panel)
app.post('/api/passages', async (req, res) => {
  try {
    const newPassage = new Passage(req.body);
    await newPassage.save();  // Save the new passage to the database
    res.status(201).json(newPassage);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save passage' });
  }
});

// Create a new test
app.post('/api/tests', async (req, res) => {
  try {
    const { name, passageIds } = req.body;
    const newTest = new Test({ name, passageIds });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create test' });
  }
});

// Get all tests (with full passage data populated)
app.get('/api/tests', async (req, res) => {
  try {
    const tests = await Test.find().populate('passageIds');
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tests' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
