const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require('nodemailer');

// Handler for server error 
const { resServerError } = require('../shared/resServerError');

// Validation rules and function for routers
const {
  emailValidationRules,
  passwordValidationRules
} = require('./validation/authRouteValidator');
const { validate } = require('../middleware/validate');

// Secret key for jwt and email data
const {
  SECRET_JWT_KEY_AUTH,
  EXPIRE_TIME_JWT_AUTH,
  SECRET_JWT_KEY_SIGN_UP,
  EXPIRE_TIME_JWT_SIGN_UP,
  SECRET_JWT_KEY_RESET,
  EXPIRE_TIME_JWT_RESET,
  EMAIL_USER,
  EMAIL_PASSWORD
} = require('../config/keys');

// Model of the collection 'users'
const User = require('../models/User');

// User role
const { USER } = require('../consts/user_role_state');

// Check admin permission middleware
const { adminPermission } = require('../middleware/permission');

// Templates for sign up email
const { signupEmail } = require('../emails/signup');
const { signupSendmailEmail } = require('../emails/signupSendmail');
const { resetEmail } = require('../emails/reset');
const { resetSendmailEmail } = require('../emails/resetSendmail');

// Create router
const router = express.Router();

// Transporter for email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  }
});

// Route for registration - send mail
router.post(
  '/signup/sendmail',
  passport.authenticate('jwt', { session: false }),
  adminPermission,
  emailValidationRules(),
  validate,
  async (req, res) => {
    // Get email from request
    const { email } = req.body;
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
      // Create jwt based on email, expiration time - 1 hour
      const token = jwt.sign({ email }, SECRET_JWT_KEY_SIGN_UP, { expiresIn: EXPIRE_TIME_JWT_SIGN_UP });

      try {
        // Response [OK]
        res.status(200).json({
          message: 'Вітаємо!\n На цю електронну адресу надіслано лист\n з посиланням для створення пароля.',
          token
        });

        // Send email
        await transporter.sendMail(signupSendmailEmail(email, token));

      } catch (e) {
        resServerError(res, e);
      }
    }
  }
);

// Route for registration
router.post(
  '/signup',
  passwordValidationRules(),
  validate,
  async (req, res) => {
    // Get email and password from request
    const { token, password } = req.body;

    // Verify token by secret key and expiration time
    jwt.verify(token, SECRET_JWT_KEY_SIGN_UP, async (err, payload) => {
      if (err) {
        // Response [Unprocessable Entity]
        return res.status(422).json({
          message: 'Посилання для створення пароля не є дійсним.\n Зверніться до адміністратора, щоб отримати нове.'
        });
      }

      // Get email from payload
      const { email } = payload;
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
          password: bcrypt.hashSync(password, salt),
          role: USER
        });

        try {
          // Save user in collection 'users'
          await user.save();

          // Response [Created]
          res.status(201).json({
            message: 'Вітаємо!\n Регістрація нового користувача пройшла успішно.'
          });

          // Send email
          await transporter.sendMail(signupEmail(email));
 
        } catch (e) {
          resServerError(res, e);
        }
      }
    });
  }
);

// Route for authentication
router.post(
  '/signin',
  async (req, res) => {
    // Get email and password from request
    const { email, password } = req.body;

    // Search document in collection 'users' with email
    const candidate = await User.findOne({ email });

    // Candidate exists
    if (candidate) {
      // Compare password from request and password from database using bcrypt
      const passwordResult = bcrypt.compareSync(
        password,
        candidate.password
      );

      // Compare passwords success
      if (passwordResult) {
        // Get data from candidate
        const { _id, email, role } = candidate;

        // Create jwt based on email and id, expiration time - 1 hour
        const token = jwt.sign(
          { _id, email, role },
          SECRET_JWT_KEY_AUTH,
          { expiresIn: EXPIRE_TIME_JWT_AUTH }
        );

        // Response [OK] - jwt and user information
        res
          .status(200)
          .set('Authorization', `Bearer ${token}`)
          .json({ _id, email, role });

      } else {
        // Response [Unauthorized] - error message
        res.status(401).json({
          message:
            'Неправильна електронна адреса або пароль.\n Повторіть спробу.'
        });
      }

    } else {
      // Response [Unauthorized] - error message
      res.status(401).json({
        message:
          'Неправильна електронна адреса або пароль.\n Повторіть спробу.'
      });
    }
  }
);

// Route for resetting password - send mail
router.post(
  '/reset/sendmail',
  emailValidationRules(),
  validate,
  async (req, res) => {
    // Get email from request
    const { email } = req.body;
    // Search document in collection 'users' with email
    const candidate = await User.findOne({ email });
    // Jwt for email
    let token;

    // Candidate exists
    if (candidate) {
      // Create jwt based on email, expiration time - 1 hour
      token = jwt.sign({ email }, SECRET_JWT_KEY_RESET, { expiresIn: EXPIRE_TIME_JWT_RESET });

      try {
        // Send email
        await transporter.sendMail(resetSendmailEmail(email, token));

      } catch (e) {
        resServerError(res, e);
      }
    }

    // Response [OK]
    res.status(200).json({
      message: 'Якщо електронна адреса коректна, на неї надіслано лист\n з посиланням для відновлення пароля.',
      token
    });
  }
);

// Route for resetting password
router.post(
  '/reset',
  passwordValidationRules(),
  validate,
  async (req, res) => {
    // Get email and password from request
    const { token, password } = req.body;

    // Verify token by secret key and expiration time
    jwt.verify(token, SECRET_JWT_KEY_RESET, async (err, payload) => {
      if (err) {
        // Response [Unprocessable Entity]
        return res.status(422).json({
          message: 'Посилання для відновлення пароля не є дійсним.'
        });
      }

      // Get email from payload
      const { email } = payload;
      // Search document in collection 'users' with email
      const candidate = await User.findOne({ email });

      // Candidate exists
      if (candidate) {
        // How many rounds bcrypt should hash password (2^round - 2 involution to power rounds)
        const salt = bcrypt.genSaltSync(10);

        try {
          // Save user in collection 'users'
          await User.findByIdAndUpdate(
            candidate._id,
            { password: bcrypt.hashSync(password, salt) },
            { new: true }
          );

          // Response [Created]
          res.status(201).json({
            message: 'Вітаємо!\n Відновлення пароля пройшло успішно.'
          });

          // Send email
          await transporter.sendMail(resetEmail(email));

        } catch (e) {
          resServerError(res, e);
        }
        
      } else {
        // Response [Not found] - error message
        res.status(404).json({
          errors: {
            email: 'Ця електронна адреса нікому не належить.'
          }
        });
      }
    });
  }
);

// Route for authorization
router.get(
  '/validate',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      // Get user from passport authentication middleware
      const { user, headers } = req;
      const { authorization } = headers;

      // Response [OK] - jwt and user information
      res
        .status(200)
        .set('Authorization', authorization)
        .json(user);

    } catch (e) {
      // Response [Unauthorized]
      res.status(401).end();
    }
  }
);

module.exports = router;
