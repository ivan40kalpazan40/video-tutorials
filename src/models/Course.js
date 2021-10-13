const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: 50 },
  imageUrl: { type: String, required: true },
  isPublic: { type: Boolean, default: false },
  created: { type: Date, required: true, default: Date.now() },
  enrolledUsers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

courseSchema.method('addEnrolledUsers', function (user) {
  this.enrolledUsers.push(user);
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
