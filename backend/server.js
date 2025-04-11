const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Passage = require('./models/Passage'); // Existing passage model
const Test = require('./models/Test');       // New test model

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

// Root
app.get('/', (req, res) => {
  res.send('IELTS Mock Test Backend is running!');
});

// === ROUTES ===

// ✅ Get all individual passages
app.get('/api/passages', async (req, res) => {
  try {
    const passages = await Passage.find();
    res.json(passages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch passages' });
  }
});

// ✅ Upload a single passage (for admin/testing)
app.post('/api/passages', async (req, res) => {
  try {
    const newPassage = new Passage(req.body);
    await newPassage.save();
    res.status(201).json(newPassage);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save passage' });
  }
});

// ✅ Upload a full IELTS test (3 passages + 38-40 questions)
app.post('/api/tests', async (req, res) => {
  try {
    const newTest = new Test(req.body);
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to save test' });
  }
});

// ✅ Get all model tests
app.get('/api/tests', async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tests' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
