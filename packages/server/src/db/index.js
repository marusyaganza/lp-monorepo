const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const createModel = require('./models');

const adapter = new FileSync('src/db/db.json');
const db = low(adapter);

db.defaults({ words: [], users: [] });

module.exports = {
  models: {
    Word: createModel(db, 'words'),
    User: createModel(db, 'users')
  },
  db
};
