const mongoose = require('mongoose');

const { Schema } = mongoose;

/*
  Model 'User'
  2 properties

  email - String
  password - String
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
  }
});

module.exports = mongoose.model(
  'users', 
  userSchema
);
