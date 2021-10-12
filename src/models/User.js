const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolled: [{ type: mongoose.Types.ObjectId, ref: 'Course' }],
});
