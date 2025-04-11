const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Mock Test 1"
  passageIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Passage' }], // references to the 3 passages
  createdAt: { type: Date, default: Date.now }
});

// Avoid model overwrite error
module.exports = mongoose.models.Test || mongoose.model('Test', TestSchema);
