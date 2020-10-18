const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, 'A date should be present to properly track items'],
  },
  vial_id: {
    type: String,
    unique: true,
    required: [true, 'A label ID must be provided.'],
  },
  zone_from: {
    type: String,
    required: [true, 'A zone must be entered.'],
  },
  zone_to: {
    type: String,
    required: [true, 'A receiving zone must be entered'],
  },
  diagnosis: {
    type: String,
    required: [true, 'A brief diagnosis caption is helpful'],
  },
  user: {
    type: String,
    required: [true, 'A user must be added'],
    unique: true,
    trim: true,
    maxlength: [29, 'User name must not be longer than 29 characters.'],
  },
  description: {
    type: String,
    maxlength: [300, 'No more than 300 characters required for description.'],
  },
});

module.exports =
  mongoose.models.DataSet || mongoose.model('DataSet', DataSchema);
