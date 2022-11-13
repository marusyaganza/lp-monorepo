const { MongoClient } = require('mongodb');
const data = require('../tests/mocks/data');
const connectStr =
  process.env.MONGO_CONNECTION ||
  `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@lp-db:27017?authSource=admin`;
// const connectStr = process.env.MONGO_CONNECTION || "mongodb://host.docker.intermal:27017";
// const connectStr = process.env.MONGO_CONNECTION || 'mongodb://localhost:27017';
// const connectStr = process.env.MONGO_CONNECTION || 'mongodb://lp-db:27017';
console.log('connectStr', connectStr);
async function initDb() {
  const client = new MongoClient(
    connectStr
    // { useUnifiedTopology: true,}
  );
  await client.connect();
  const db = await client.db('lp');
  const words = db.collection('words');
  const users = db.collection('users');
  // await words.insertMany(data.words);
  // await users.insertMany(data.users);
  const word = await words.find({ id: 'mockid' }).toArray();
  console.log('word', word);
}

// initDb();

module.exports = { initDb };
