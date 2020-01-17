const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Handler for error 
const errorHandler = require('../utils/errorHandler');

// Secret key for jwt
const { SECRET_JWT_KEY } = require('../config/keys');

// Model of the collection 'users'
const User = require('../models/User');

// Creating router
const router = express.Router();

// Route for registering
router.post('/register', async (req, res) => {
  // Search document in collection 'users' with email
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    // Candidate already exists
    res.status(409).json({
      message: 'Такий email вже зайнятий. Спробуйте інший.'
    });

  } else {
    // How many rounds bcrypt has to hash password 
    // (2^round - 2 involution to power rounds)
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    // Creation user with email and hashed password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    });

    try {
      // Save user in collection 'users'
      await user.save();
      // Send response with user
      res.status(201).json(user);

    } catch (e) {
      errorHandler(res, e);
    }
  }
});

// Route for logging
router.post('/login', async (req, res) => {
  // Search document in collection 'users' with email
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    // Comparison password from request and password from database using bcrypt
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

    if (passwordResult) {
      // Creation jwt token based on email and id, expiration date - 1 hour
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, SECRET_JWT_KEY, { expiresIn: 60 * 60 });

      // Send response with jwt token
      res.status(200).json({
        token: `Bearer ${token}`
      });

    } else {
      // Password is not correct
      res.status(401).json({
        message: 'Паролі не збігаються. Спробуйте знову.'
      });
    }

  } else {
    // Candidate with this email isn't found
    res.status(404).json({
      message: 'Користувач з таким email не знайдений.'
    });
  }
});

module.exports = router;
