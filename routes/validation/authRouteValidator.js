const { body, validationResult } = require('express-validator');
const passwordValidator = require('password-validator');

// Creating schema for password validation
const pwSchema = new passwordValidator();
/* 
  Configuration schema for password validation

  At least 1 uppercase
  At least 1 lowercase
  At least 1 digit
  At least 1 symbol
  No spaces
*/
pwSchema
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols()
  .has().not().spaces();

// Rules for registration router
const registerValidationRules = () => {
  return [
    // Check if it is email
    body('email')
      .isEmail()
      .withMessage('Некоректно введений email.'),
    
    // Check if password has 8-64 symbols, at least 1 uppercase, lowercase, digit, symbol and hasn't whitespaces
    body('password')
      .isLength({ min: 8, max: 64 })
      .withMessage('Довжина пароля повинна бути 8-64 символів.')
      .custom(value => pwSchema.validate(value))
      .withMessage('Пароль повинен містити щонайменше одну малу літеру, велику літеру, цифру, символ і не мати пробілів.')
  ];
};

// Middleware for validation registration router
const validate = (req, res, next) => {
  // Get errors after validation
  const errors = validationResult(req);

  // If there aren't any errors, go to the next middleware
  if (errors.isEmpty()) {
    return next();
  }

  // Array with formatted errors
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  // Send response with these errors
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  registerValidationRules,
  validate,
};
