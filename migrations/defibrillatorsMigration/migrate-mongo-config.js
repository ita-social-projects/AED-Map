const mongoURI = process.env.MONGODB_URI || 'mongodb://root:root@localhost:27017/defibrillator';


const config = {
  mongodb: {
    url: mongoURI,
    databaseName: MONGODB_DATABASE,
    options: {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    }
  },

  migrationsDir: './migrations/defibrillatorsMigration/migration',

  changelogCollectionName: 'changelog'
};

module.exports = config;
