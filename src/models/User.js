const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledIn: [{ type: mongoose.Types.ObjectId, ref: 'Course' }],
  courses: [{ type: mongoose.Types.ObjectId, ref: 'Course' }],
  created: [{ type: mongoose.Types.ObjectId, ref: 'Course' }],
});

userSchema.method('enroll', function (course) {
  this.enrolledIn.push(course);
});

userSchema.method('becomeAuthor', function (course) {
  this.courses.push(course);
});
userSchema.method('isAuthor', function (courseId) {
  return this.courses.includes(courseId);
});

userSchema.method('isEnrolled', function (courseId) {
  return this.enrolledIn.includes(courseId);
});

userSchema.method('validatePassword', function (password) {
  return bcrypt.compare(password, this.password);
});
const User = mongoose.model('User', userSchema);
module.exports = User;
