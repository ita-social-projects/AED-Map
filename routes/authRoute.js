const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Handler for server error 
const resServerError = require('../shared/resServerError');

// Validation rules and function for routers
const { signupValidationRules } = require('./validation/authRouteValidator');
const { validate } = require('../shared/validateRoute');

// Secret key for jwt
const { SECRET_JWT_KEY } = require('../config/keys');

// Model of the collection 'users'
const User = require('../models/User');

// Create router
const router = express.Router();

// Route for registration
router.post('/signup', signupValidationRules(), validate, async (req, res) => {
  // Get email and password from request
  const { email, password } = req.body;
  // Search document in collection 'users' with email
  const candidate = await User.findOne({ email });

  // Candidate exists
  if (candidate) {
    // Response [Conflict] - error message
    res.status(409).json({
      errors: {
        email: 'Ця електронна адреса вже комусь належить.\n Спробуйте іншу.'
      }
    });

  } else {
    // How many rounds bcrypt should hash password (2^round - 2 involution to power rounds)
    const salt = bcrypt.genSaltSync(10);
    // Create user with email and hashed password
    const user = new User({
      email,
      password: bcrypt.hashSync(password, salt)
    });

    try {
      // Save user in collection 'users'
      await user.save();
      // Response [Created]
      res.status(201).json({
        message: 'Вітаємо!\n Регістрація нового користувача пройшла успішно.'
      });

    } catch (e) {
      resServerError(res, e);
    }
  }
});

// Route for authentication
router.post('/signin', async (req, res) => {
  // Get email and password from request
  const { email, password } = req.body;

  // Search document in collection 'users' with email
  const candidate = await User.findOne({ email });

  // Candidate exists
  if (candidate) {
    // Compare password from request and password from database using bcrypt
    const passwordResult = bcrypt.compareSync(password, candidate.password);

    // Compare passwords success
    if (passwordResult) {
      // Create jwt based on email and id, expiration time - 1 hour
      const token = jwt.sign({
        userId: candidate._id,
        email: candidate.email
      }, SECRET_JWT_KEY, { expiresIn: 60 * 60 });

      // Response [OK] - jwt and user information
      res.status(200)
        .set('Authorization', `Bearer ${token}`)
        .json({ _id: candidate._id, email: candidate.email });

    } else {
      // Response [Unauthorized] - error message
      res.status(401).json({
        message: 'Неправильна електронна адреса або пароль.\n Повторіть спробу.'
      });
    }

  } else {
    // Response [Unauthorized] - error message
    res.status(401).json({
      message: 'Неправильна електронна адреса або пароль.\n Повторіть спробу.'
    });
  }
});

// Route for authorization
router.get('/validate', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Get user from passport authentication middleware
    const { user, headers } = req;
    const { authorization } = headers;

    // Response [OK] - jwt and user information
    res.status(200)
      .set('Authorization', authorization)
      .json(user);

  } catch (e) {
    // Response [Unauthorized]
    res.status(401).end();
  }
});

module.exports = router;
