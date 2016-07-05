/**
 * Imports Anki cards into MongoDB
 */

'use strict';

const mongoose = require('mongoose');
const Sentence = require('../src/server/models/sentence');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./collection.anki2');

// Anki `Japanese (Text Input)-7c80b` model field order 
const fieldOrder = [
  'Expression',
  'Question',
  'Answer',
  'Hint',
  'Meaning',
  'Notes',
  'Reading'
];
const separator = String.fromCharCode(31);

mongoose.connect('mongodb://localhost/lc');

// enumerate each note in Anki collection
db.each('SELECT * FROM notes', (err, row) => {
  var fields = parseField(row.flds);
  var sentence = new Sentence({
    expression: fields.Expression,
    question: fields.Question,
    answer: fields.Answer,
    hint: fields.Hint,
    meaning: fields.Meaning,
    notes: fields.Notes,
    reading: fields.Reading
  });
  sentence.save((err) => {
    if (err) {
      throw err;
    } else {
      console.log('Saved expression:', fields.Expression);
    }
  });
});

db.close();

/**
 * Parses Anki field and returns a map
 * @params {String} field
 * @returns {Object} fields
 */
function parseField(field) {
  var fields = field.split(separator);
  return fieldOrder.reduce((obj, currentFieldName, index) => {
    obj[currentFieldName] = fields[index];
    return obj;
  }, {});
}

