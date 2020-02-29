const mongoose = require('mongoose');

const {
  ADMIN,
  USER
} = require('../consts/user_role_state');

const { Schema } = mongoose;

/*
  Model 'User'
  2 properties

  email - String
  password - String
  role - String
    + available values:
      "admin",
      "user"
*/

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: [
      ADMIN,
      USER
    ],
    required: true
  }
});

module.exports = mongoose.model(
  'users', 
  userSchema
);
