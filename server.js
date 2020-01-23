const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');

// Import routes
const authRoute = require('./routes/authRoute');
const defRoute = require('./routes/defRoute');

// Creating server
const app = express();

// Middleware for json
app.use(express.json());
// Middleware for URL-encoding data
app.use(express.urlencoded({ extended: true }));
// Middleware for build
app.use(express.static('client/build'));

// Middlewares for routes
app.use('/api/auth', authRoute);
app.use('/api/defibrillator', defRoute);

// Middlewares for passport
app.use(passport.initialize());
require('./middleware/passport')(passport);

// Creating connect with database
mongoose.connect('mongodb://localhost:27017/defibrillatorDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('connection to database established');
}).catch(err => {
  console.log(`db error ${err.message}`);
});

// Route for getting buld
app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, 'client', 'build', 'index.html')
  );
});

// Listening server
const PORT = 3012;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
