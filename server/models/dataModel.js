const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Number: {
    type: String,
    required: true
  },
  Dob: {
    type: String,
    required: true
  },
  "Door No": {
    type: String,
    required: true
  },
  "Addr 1": {
    type: String,
    required: true
  },
  "Addr 2": {
    type: String,
    required: true
  },
  City: {
    type: String,
    required: true
  },
  State: {
    type: String,
    required: true
  },
  Country: {
    type: String,
    required: true
  }
});

const DataModel = mongoose.model('data', dataSchema);

module.exports = DataModel;