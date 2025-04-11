// backend/routes/admin.js

const express = require("express");
const Passage = require("../models/Passage");  // Importing the Passage model
const router = express.Router();

// Define a POST route to upload new passages
router.post("/upload-passage", async (req, res) => {
  try {
    const { title, text, questions } = req.body;  // Extracting data from the request body

    // Create a new passage using the Passage model
    const newPassage = new Passage({
      title,
      text,
      questions
    });

    // Save the passage to MongoDB
    await newPassage.save();

    res.status(201).json({ message: "Passage uploaded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading passage" });
  }
});

module.exports = router;
