const config = {
  mongodb: {
    url: `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}`,
    databaseName: process.env.MONGO_DB_NAME,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  migrationsDir: './migrations/adminMigration/migration',

  changelogCollectionName: 'changelog'
};

module.exports = config;
