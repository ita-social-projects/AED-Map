const mongoose = require('mongoose');

const defaultMongoURI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}`;
let gfs;

const dbInit = (mongoURI = defaultMongoURI) => {
  mongoose.connect(mongoURI, {
    dbName: 'defibrillatorDB',
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  const conn = mongoose.connection;

  conn.on(
    'error',
    console.error.bind(console, 'connection error:')
  );
  conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'images'
    });

    console.log('connection to database established');
  });
};

const getGFS = () => gfs;

module.exports = { mongoose, dbInit, getGFS };
