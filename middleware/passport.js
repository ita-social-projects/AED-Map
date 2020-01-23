const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Secret key for jwt
const { SECRET_JWT_KEY } = require('../config/keys');

// Model of the collection 'users'
const User = mongoose.model('users');

// Configuration for jwt-strategy in 'passport'
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_JWT_KEY
};

module.exports = passport => {
  passport.use(
    // Creation jwt-strategy in 'passport'
    new JwtStrategy(options, async (payload, done) => {
      try {
        // Search document in collection 'users' with id
        const user = await User.findById(payload.userId).select('email id');

        if (user) {
          // Callback with user
          done(null, user);

        } else {
          // Callback with false
          done(null, false);
        }

      } catch (e) {
        console.log(e.message);
      }
    })
  );
};
