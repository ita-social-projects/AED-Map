const mongoURI = process.env.MONGODB_URI || 'mongodb://root:root@localhost:27017';
const database = process.env.MONGODB_DATABASE || 'defibrillators_db';
const config = {
  mongodb: {
    url: mongoURI,
    databaseName: database,
    options: {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    }
  },

  migrationsDir: './migrations/adminMigration/migration',

  changelogCollectionName: 'changelog'
};

module.exports = config;
