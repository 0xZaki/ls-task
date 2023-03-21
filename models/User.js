const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true, 
    required: [true, "Email is required"], 
    match: [/\S+@\S+\.\S+/, 'invalid Email']
  },

  passwordHash: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});


userSchema.plugin(uniqueValidator, { message: 'Email already exists' });


const User = mongoose.model('User', userSchema);

module.exports = User;
