'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('Tag', {
  value: String,
  userId: { type: Number, default: 0 }
});

