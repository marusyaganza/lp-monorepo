const { MongoClient } = require('mongodb');
const createModel = require('./models');
const { userValidator, wordsValidator } = require('./validators');

const collections = [
  { name: 'words', validator: wordsValidator },
  { name: 'users', validator: userValidator }
];

const connectStr = process.env.MONGO_CONNECTION || 'mongodb://lp-db:27017';

let _db;
function initDb(callback) {
  const client = new MongoClient(connectStr, { useUnifiedTopology: true });
  client
    .connect()
    .then(client => {
      _db = client.db('lp');
      // add schema validator
      collections.forEach(collection => {
        // check if validator already exist
        try {
          _db
            .command({
              listCollections: 1.0,
              filter: { name: collection.name }
            })
            .then(cl => {
              const existingValidator =
                cl?.cursor?.firstBatch?.[0]?.options.validator;
              // assign a new validator
              if (!existingValidator) {
                _db.createCollection(collection.name, {
                  validator: collection.validator
                });
              }
            });
        } catch (err) {
          console.log(err);
        }
      });

      const models = {
        Word: createModel(_db, 'words'),
        User: createModel(_db, 'users')
      };
      callback(models);
    })
    .catch(err => {
      console.log('mongo err', err);
    });
}

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.initDb = initDb;
exports.getDB = getDB;
