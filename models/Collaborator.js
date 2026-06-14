const mongoose = require('mongoose');

const collaboratorSchema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  role:  { type: String, default: '' },   // e.g. "Web Developer", "Content Lead"
  bio:   { type: String, default: '' },
  photo: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Collaborator', collaboratorSchema);
