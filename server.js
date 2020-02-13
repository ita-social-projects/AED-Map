const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const http = require('http');
const socketio = require('socket.io');
const { SECRET_JWT_KEY } = require('./config/keys');

const authRoute = require('./routes/authRoute');
const defRoute = require('./routes/defRoute');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client/build'));

app.use('/api/auth', authRoute);
app.use('/api/defibrillators', defRoute);

// Middlewares for passport
app.use(passport.initialize());
require('./middleware/passport')(passport);

///////////////////////////////////////////////// SOCKET IO
// const socketioJwt = require('socketio-jwt');

// io.on('connection', socketioJwt.authorize({
//   secret: SECRET_JWT_KEY,
//   timeout: 15000, // 15 seconds to send the authentication message
// }));

var jwtAuth = require('socketio-jwt-auth');
const User = mongoose.model('users');

io.use(jwtAuth.authenticate({
  secret: SECRET_JWT_KEY   
}, async (payload, done) => {
  
  try {
    const user = await User.findById(payload.userId).select('id email');

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }

  } catch (e) {
    console.log(e.message);
  }
}));

io.on('connection', function(socket) {
  console.log('Authentication passed!');

  socket.emit('success', {
    message: 'success logged in!',
    user: socket.request.user
  });
});
///////////////////////////////////////////////// SOCKET IO

mongoose
  .connect('mongodb://localhost:27017/defibrillatorDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('connection to database established');
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
  });

app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, 'client', 'build', 'index.html')
  );
});

module.exports = { server, mongoose };
