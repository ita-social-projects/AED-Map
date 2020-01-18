const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client/build'));

mongoose
  .connect('mongodb://localhost:27017/defibrillatorDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log('connection to database established');
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
  });

app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(
      __dirname,
      'client',
      'build',
      'index.html',
    ),
  );
});

const PORT = 3012;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
