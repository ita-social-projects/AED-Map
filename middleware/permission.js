const deepEqual = require('deep-equal');
const jwt = require('jsonwebtoken');

// Secret key for jwt
const { SECRET_JWT_KEY_AUTH } = require('../config/keys');

// Model of the collection 'defibrillator'
const Defibrillator = require('../models/Defibrillator');

// Admin and user role
const { ADMIN, USER } = require('../consts/user_role_state');

// Middleware for verification permission
const checkPermission = async (req, res, next) => {
  // Get jwt if it exists
  const authorization = req.headers.authorization && req.headers.authorization.slice(7);
  
  // Verify jwt and if it is valid - send role to the next middleware
  jwt.verify(authorization, SECRET_JWT_KEY_AUTH, async (err, payload) => {
    if (err) return next();
    req.role = payload.role;
    return next();
  });
};

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
  // Search document in collection 'users' with id
  const { _id, role } = req.user;
  // Search document in collection 'defibrillators' with id
  const defibrillator = await Defibrillator.findById(req.params.id).select('owner');

  // User have permission
  if((role === ADMIN) || 
     ((role === USER) && deepEqual(_id,defibrillator.owner))) return next();

  // Response [Forbidden] - error message
  res.status(403).json({
    message: 'Ви не маєте дозволу на доступ до цієї операції.'
  });
};

// Middleware for admin-user permission for creating images
const imageCreatePermission = async (req, res, next) => {
  // Search document in collection 'users' with id
  const { _id, role } = req.user;
  // Search document in collection 'defibrillators' with id
  const defibrillator = await Defibrillator.findById(req.params.defibrillatorId).select('owner');

  // User have permission
  if((role === ADMIN) || 
     ((role === USER) && deepEqual(_id,defibrillator.owner))) return next();

  // Response [Forbidden] - error message
  res.status(403).json({
    message: 'Ви не маєте дозволу на доступ до цієї операції.'
  });
};

// Middleware for admin-user permission for deleting images
const imageDeletePermission = async (req, res, next) => {
  // Search document in collection 'users' with id
  const { _id, role } = req.user;
  // Search document in collection 'defibrillators' with id
  const defibrillator = await Defibrillator.findById(req.params.defibrillatorId).select('owner images');
  // Check if image has relation with defibrillator
  const isImageFromDefibrillator = defibrillator.images.some(image => image.id === req.params.imageId);

  // User have permission
  if(((role === ADMIN) || 
     ((role === USER) && deepEqual(_id,defibrillator.owner))) && 
     isImageFromDefibrillator) return next();

  // Response [Forbidden] - error message
  res.status(403).json({
    message: 'Ви не маєте дозволу на доступ до цієї операції.'
  });
};

module.exports = {
  checkPermission,
  adminPermission,
  defChangePermission,
  imageCreatePermission,
  imageDeletePermission
};
