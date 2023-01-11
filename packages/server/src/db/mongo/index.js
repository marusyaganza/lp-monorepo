const createModel = require('./models');
const { getDB } = require('./initDB');

const db = getDB();

module.exports = {
  models: {
    Word: createModel(db, 'words'),
    User: createModel(db, 'users')
  }
};
