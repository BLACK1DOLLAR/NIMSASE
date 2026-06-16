const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  whatsappNumber:   { type: String, default: '2348000000000' },
  email:            { type: String, default: 'nimsa.se@gmail.com' },
  facebook:         { type: String, default: '#' },
  instagram:        { type: String, default: '#' },
  twitter:          { type: String, default: '#' },
  snapchat:         { type: String, default: '#' },
  siteName:         { type: String, default: 'NiMSA South East Region' },
  resPastQuestions: { type: String, default: '' },
  resClinicalGuides:{ type: String, default: '' },
  resIFMSA:         { type: String, default: '' },
  resScholarships:  { type: String, default: '' },
  resResearch:      { type: String, default: '' },
  resNMAMDCN:       { type: String, default: '' },
  heroImage:        { type: String, default: '' },
  watermarkImage:   { type: String, default: '' },
  watermarkText:    { type: String, default: '' },

  // ── Acknowledgement section — ICT Director (lead) ──
  ictDirectorName:  { type: String, default: '' },
  ictDirectorYear:  { type: String, default: '' },   // e.g. "2026/2027"
  ictDirectorBio:   { type: String, default: '' },
  ictDirectorPhoto: { type: String, default: '' },
  ackIntro:         { type: String, default: '' },   // optional intro paragraph

  // ── Acknowledgement section — Web Developer (featured, between lead & collaborators) ──
  webDevName:       { type: String, default: '' },
  webDevRole:       { type: String, default: 'Web Developer' },
  webDevYear:       { type: String, default: '' },
  webDevBio:        { type: String, default: '' },
  webDevPhoto:      { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
