const express = require('express');
const path = require('path');
const passport = require('passport');
const http = require('http');
const socketio = require('socket.io');
const authRoute = require('./routes/authRoute');
const defRoute = require('./routes/defRoute');
const gmapRoute = require('./routes/gMapRoute');
const imageRoute = require('./routes/imageRoute');

const { authEvent } = require('./websocket/authEvent');

const app = express();
const server = http.Server(app);
const io = socketio(server);

// Websocket event for sign out
authEvent(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoute);
app.use('/api/gmap', gmapRoute);
app.use('/api/defibrillators', defRoute);
app.use('/api/images', imageRoute);

// Middlewares for passport
app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use((req, res, next) => {
  console.log('%O', req);
  next();
});

module.exports = { server, app };
