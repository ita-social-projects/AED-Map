const deepEqual = require('deep-equal');

// Model of the collection 'users' and 'defibrillator'
const User = require('../models/User');
const Defibrillator = require('../models/Defibrillator');

// Admin and user role
const { ADMIN, USER } = require('../consts/user_role_state');

// Middleware for admin permission
const adminPermission = async (req, res, next) => {
  // Search document in collection 'users' with id
  const { role } = req.user;
  
  // User have permission
  if(role === ADMIN) return next();

  // Response [Forbidden] - error message
  res.status(403).json({
    message: 'Ви не маєте дозволу на доступ до цієї операції.'
  });
};

// Middleware for admin-user permission during the work with defibrillators
const defChangePermission = async (req, res, next) => {
  // // Search document in collection 'users' with id
  const { _id, role } = req.user;
  // // Search document in collection 'defibrillators' with id
  const defibrillator = await Defibrillator.findById(req.params.id).select('owner');

  // User have permission
  if((role === ADMIN) || 
     ((role === USER) && deepEqual(_id,defibrillator.owner))) return next();

  // Response [Forbidden] - error message
  res.status(403).json({
    message: 'Ви не маєте дозволу на доступ до цієї операції.'
  });
};

module.exports = {
  adminPermission,
  defChangePermission
};
