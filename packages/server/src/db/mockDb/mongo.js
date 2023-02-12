// TODO delete this file
const { MongoClient } = require('mongodb');
const data = require('../tests/mocks/data');
console.log('env', process.env.MONGO_USERNAME, process.env.MONGO_PASSWORD);
// const connectStr =
//   process.env.MONGO_CONNECTION ||
//   `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@lp-db:27017?authSource=admin`;
// const connectStr = process.env.MONGO_CONNECTION || "mongodb://host.docker.intermal:27017";
// const connectStr = process.env.MONGO_CONNECTION || 'mongodb://localhost:27017';
const connectStr = process.env.MONGO_CONNECTION || 'mongodb://lp-db:27017';
// console.log('connectStr', connectStr);
async function initDb() {
  try {
    const client = new MongoClient(
      connectStr
      // { useUnifiedTopology: true,}
    );
    await client.connect();
    const db = await client.db('lp');
    // let words = db.collection('words');
    // if (words) {
    //   words.drop();
    // }
    // words = await db.createCollection('words', {
    //   validator: {
    //     $jsonSchema: {
    //       required: [
    //         'name',
    //         'defs',
    //         'particle',
    //         'stems',
    //         'isOffensive',
    //         'user'
    //       ],
    //       properties: {
    //         name: {
    //           bsonType: 'string',
    //           description: "'name' must be a string and is required"
    //         },
    //         defs: {
    //           bsonType: 'array',
    //           description: "'defs' must be a string and is required",
    //           items: {
    //             bsonType: 'object',
    //             required: ['def', 'examples'],
    //             description: "'defs' must be a string and is required",
    //             properties: {
    //               def: {
    //                 bsonType: 'string',
    //                 description: "'def' must be a string and is required"
    //               },
    //               examples: {
    //                 bsonType: 'array',
    //                 description: "'examples' must be a string and is required",

    //                 items: {
    //                   bsonType: 'string'
    //                 }
    //               }
    //             }
    //           }
    //         },
    //         particle: {
    //           bsonType: 'string',
    //           description: "'user' must be a string and is required"
    //         },
    //         user: {
    //           bsonType: 'objectId'
    //         },
    //         stems: {
    //           bsonType: 'array',
    //           items: {
    //             bsonType: 'string'
    //           }
    //         },
    //         isOffensive: {
    //           bsonType: 'bool'
    //         }
    //       }
    //     }
    //   }
    // });
    // console.log('data', data);
    // words = db.collection('words');
    const users = await db.collection('users');
    // console.log('users', users);
    if (users) {
      await users.drop();
    }
    // await db.createCollection()
    // await words.insertOne(data.words[0]);
    await users.insertMany(data.users);
    const user = await users.find().toArray();
    console.log('users', user);

    // const word = await words.find({ id: 'mockid' }).toArray();
    // console.log('word', word);
    // await db.words.drop();
  } catch (err) {
    console.log('mongo err', err);
  }
}

// initDb();

module.exports = { initDb };
