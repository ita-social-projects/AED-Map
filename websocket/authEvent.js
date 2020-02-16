const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { SECRET_JWT_KEY } = require('../config/keys');

const User = mongoose.model('users');

const authEvent = io => {
  io.on('connection', (socket) => {
    socket.on('authorization', authorization => {
      jwt.verify(authorization, SECRET_JWT_KEY, async (err, payload) => {
        if (err) {
          socket.emit('signout');
          return;
        }

        try {
          const user = await User.findById(payload.userId);

          if (!user) {
            socket.emit('signout');
            return;
          }

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
