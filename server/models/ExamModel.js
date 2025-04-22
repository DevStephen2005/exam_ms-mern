// models/Exam.js
const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  duration: String,
  venue: String,
  capacity: Number,
  registeredCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Exam', examSchema);
