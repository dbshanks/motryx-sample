const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  vial_id: {
    type: Number,
    unique: true,
    required: [true, 'A label ID must be provided.'],
    createdAt: { type: Date, default: Date.now() },
  },
  zone_from: {
    type: String,
    required: [true, 'A zone must be entered.'],
  },
  zone_to: {
    type: String,
    required: [true, 'A receiving zone must be entered'],
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

module.exports = mongoose.models.Data || mongoose.model('Data', DataSchema);
