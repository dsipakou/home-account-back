require('dotenv').config();
const mongoose = require('mongoose');

const userSchema = mongoose.schema({
  email: {
    type: String,
    required: [true, 'Email is required field'],
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: [true, 'Password is required field'],
    minlenght: 5,
  },
  username: {
    type: String,
    required: [true, 'Username is required field'],
    trim: true,
    maxlength: 100,
  },
  firstName: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  token: {
    type: String,

  }
});
