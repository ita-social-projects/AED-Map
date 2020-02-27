const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const http = require('http');
const socketio = require('socket.io');
const dotenv = require('dotenv').config();

const authRoute = require('./routes/authRoute');
const defRoute = require('./routes/defRoute');

const { authEvent } = require('./websocket/authEvent');

const app = express();
const server = http.Server(app);
const io = socketio(server);

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});
// Websocket event for sign out
authEvent(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client/build'));

app.use('/api/auth', authRoute);
app.use('/api/defibrillators', defRoute);

// Middlewares for passport
app.use(passport.initialize());
require('./middleware/passport')(passport);

mongoose
  .connect(process.env.MONGO_URL, {
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

app.get('/', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, 'client', 'build', 'index.html')
  );
});

module.exports = { server, app, mongoose };
