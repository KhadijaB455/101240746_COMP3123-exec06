const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated


// Define the Note Schema
const noteSchema = new mongoose.Schema({
  noteTitle: {
    type: String,
    required: true
  },
  noteDescription: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['HIGH', 'LOW', 'MEDIUM'],
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }
});




module.exports = mongoose.model("notes", noteSchema);
