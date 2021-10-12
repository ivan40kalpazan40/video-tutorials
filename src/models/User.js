const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledIn: [{ type: mongoose.Types.ObjectId, ref: 'Course' }],
});
userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 12).then((hash) => {
    this.password = hash;
    next();
  });
});
const User = mongoose.model('User', userSchema);
module.exports = User;
