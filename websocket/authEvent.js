const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const timer = require('long-timeout');

const { SECRET_JWT_KEY_AUTH } = require('../config/keys');

const User = mongoose.model('users');

const authEvent = io => {
  io.on('connection', (socket) => {
    socket.on('authorization', authorization => {
      jwt.verify(authorization, SECRET_JWT_KEY_AUTH, async (err, payload) => {
        if (err) {
          socket.disconnect();
          return;
        }

        try {
          const user = await User.findById(payload._id);

          if (!user) {
            socket.disconnect();
            return;
          }

          const expiresIn = (payload.exp - Date.now() / 1000) * 1000;
          const timeout = timer.setTimeout(() => socket.disconnect(), expiresIn);

          socket.on('disconnect', () => timer.clearTimeout(timeout));

        } catch (e) {
          console.log(e.message);
        }
      });
    });
  });
};

module.exports = {
  authEvent
};
