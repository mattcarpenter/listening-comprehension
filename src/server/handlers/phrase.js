'use strict';

const mongoose = require('mongoose');
const Sentence = require('../models/sentence');

module.exports = function PhraseHandler (request, reply) {
  Sentence.count().exec((err, count) => {
    if (err) {
        throw err;
    }

    var random = Math.floor(Math.random() * count);
    Sentence.findOne().skip(random).exec((err, result) => {
      if (err) {
        throw err;
      }

      reply(result);
    });
  });
};
