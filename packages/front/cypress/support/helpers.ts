import { connect, connection } from 'mongoose';
import { mockUser } from './mocks/mockData';
import { WordTag } from '../../src/generated/graphql';

export async function connectToDb() {
  const dbUrl =
    process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/test';
  try {
    await connect(dbUrl);
  } catch (err) {
    console.error('mongoose err, make sure you run the DB', err);
  }
}

export async function disconnectFromDb() {
  try {
    await connection.close();
  } catch (err) {
    console.error('mongoose close connection error', err);
  }
}

export async function dropDb() {
  try {
    await connection.db.dropDatabase();
  } catch (err) {
    console.error('mongoose drop db error', err);
  }
}

export async function seedDb(input?: { tags?: Partial<WordTag>[] }) {
  const tags = input?.tags;
  try {
    const usersCollection = await connection.db.createCollection('users');
    const user = await usersCollection.insertOne(mockUser);
    const userId = user.insertedId.toString();
    if (tags) {
      let tagsInput = tags;
      if (userId) {
        tagsInput = tagsInput.map(t => ({
          ...t,
          user: userId
        }));
      }
      const tagsCollection = await connection.db.createCollection('wordtags');
      await tagsCollection.insertMany(tagsInput);
    }
  } catch (err) {
    console.error('mongoose drop db error', err);
  }
}
