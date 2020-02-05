const { validationResult } = require('express-validator');

// Middleware for validation on router
const validate = (req, res, next) => {
  // Get errors after validation rules
  const errors = validationResult(req);

  // If there are not any errors, go to the next middleware
  if (errors.isEmpty()) return next();

  // Create array of formatted errors
  const extractedErrors = {};
  errors.array().forEach(err => { if(!extractedErrors[err.param]) extractedErrors[err.param] = err.msg; });

  // Response [Unprocessable Entity] - array of errors and first error message
  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  validate
};
