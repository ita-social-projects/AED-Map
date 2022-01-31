const config = {
  mongodb: {
    url: 'mongodb://localhost:27017',
    databaseName: 'defibrillatorDB',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  migrationsDir:
    './migrations/defibrillatorsMigration/migration',

  changelogCollectionName: 'changelog'
};

module.exports = config;
