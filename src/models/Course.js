const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: 50 },
  imageUrl: { type: String, required: true },
  isPublic: { type: Boolean, default: false },
  created: { type: Date, required: true },
  enrolledUsers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
