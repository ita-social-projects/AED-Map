const { body } = require('express-validator');
const passwordValidator = require('password-validator');

// Create schema for password validation
const pwSchema = new passwordValidator();

// Configuration schema for password validation
// Password has at least 1 uppercase, 1 lowercase,
// 1 digit, 1 symbol and hasn't spaces
pwSchema
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols()
  .has().not().spaces();

// Rules for registration router - create
const emailValidationRules = () => {
  return [
    // Email - required and structure email
    body('email')
      .notEmpty()
      .withMessage('Поле обов\'язкове.')
      .isEmail()
      .withMessage('Некоректно введена електронна адреса.'),
  ];
};

// Rules for registration router
const passwordValidationRules = () => {
  return [
    // Password - required, length 8 - 64 symbols and password validation
    body('password')
      .notEmpty()
      .withMessage('Поле обов\'язкове.')
      .isLength({ min: 8, max: 64 })
      .withMessage('Довжина пароля повинна бути від 8 до 64 символів.')
      .custom(value => pwSchema.validate(value))
      .withMessage('Пароль повинен містити щонайменше одну малу літеру, ' +
        'велику літеру, цифру, символ і не мати пробілів.'),

    // Confirmation password - required and equel password
    body('passwordConfirm')
      .notEmpty()
      .withMessage('Поле обов\'язкове.')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Некоректно введене підтвердження пароля.')
  ];
};

module.exports = {
  emailValidationRules,
  passwordValidationRules
};
