const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

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

// Mongoose Schema
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
app.get('/', (req, res) => {
  res.send('IELTS Mock Test Backend is running!');
});

// Get all passages
app.get('/api/passages', async (req, res) => {
  try {
    const passages = await Passage.find();
    res.json(passages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch passages' });
  }
});

// Upload a new passage (for admin panel)
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

// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");  // Importing the admin routes

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Parse incoming JSON data

// Use the admin routes for uploading passages
app.use("/admin", adminRoutes);

// Connect to MongoDB
mongoose.connect("mongodb://your-mongo-connection-uri", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
