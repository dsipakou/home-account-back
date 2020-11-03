require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT = 10;

const userSchema = mongoose.Schema({
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

userSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(SALT, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err)
        }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}

userSchema.methods.generateToken = function(callback) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.SECRET);
  user.token = token;
  user.save((err, user) => {
    if (err) {
      callback(err);
    }
    callback(null, user);
  });
}

userSchema.statics.findByToken = function(token, callback) {
  var user = this;
  jwt.verify(token, process.env.SECRET, (err, decode) => {
    user.findOne({
      '_id': decode,
      'token': token,
    }, (err ,user) => {
      if (err) {
        return callback(err);
      }
      callback(null, user);
    });
  });
}

const User = mongoose.model('User', userSchema);
module.exports = { User };
