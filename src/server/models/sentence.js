'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('Sentence', {
  expression: String,
  question: String,
  answer: String,
  hint: String,
  meaning: String,
  notes: String,
  reading: String,
  tags: [String],
  userId: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
});

