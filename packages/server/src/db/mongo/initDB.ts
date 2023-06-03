import createModel from './models';
import { userValidator, wordsValidator } from './validators';
import { Table, ModelsType, UserModel } from '../';
import { Word } from 'generated/graphql';
const { MongoClient } = require('mongodb');
const collections = [
  { name: 'words', validator: wordsValidator },
  { name: 'users', validator: userValidator }
];

const connectStr = process.env.MONGO_CONNECTION || 'mongodb://lp-db:27017';

// temporary untill transition to mongoose
let _db: any;

export function initDb(callback: (model: ModelsType) => void) {
  const client = new MongoClient(connectStr, { useUnifiedTopology: true });
  client
    .connect()
    .then((client: any) => {
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
            .then((cl: any) => {
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

      const models: ModelsType = {
        Word: createModel<Word>(_db, Table.WORD),
        User: createModel<UserModel>(_db, Table.USER)
      };
      callback(models);
    })
    .catch((err: string) => {
      console.log('mongo err', err);
    });
}

export const getDB = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};
