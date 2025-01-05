import { connect, connection } from 'mongoose';
import { NewWordInput, User, WordTag } from '../../generated/graphql';

export async function connectToDb() {
  try {
    await connect('mongodb://localhost:27017/server-test');
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

interface MockModels {
  words?: Partial<NewWordInput>[];
  users?: Partial<User>[];
  tags?: Partial<WordTag>[];
}

export async function seedDb(input?: MockModels) {
  const data: { words?: string[]; users?: string[]; tags?: string[] } = {};
  try {
    // default user - first in the user's input
    let userId;

    if (input?.users?.length) {
      const usersCollection = await connection.db.createCollection('users');
      const createdUsers = await usersCollection.insertMany(input.users);
      const users = Object.values(createdUsers.insertedIds).map(u =>
        u.toString()
      );
      data.users = users;
      userId = users[0];
    }

    if (input?.words?.length) {
      let wordsInput = input.words;
      // if users are seeded, all the words belong to the first user
      if (userId) {
        wordsInput = input.words.map(w => ({
          ...w,
          user: userId
        }));
      }

      const wordsCollection = await connection.db.createCollection('words');
      const createdWords = await wordsCollection.insertMany(wordsInput);
      data.words = Object.values(createdWords.insertedIds).map(w =>
        w.toString()
      );
    }

    if (input?.tags?.length) {
      let tagsInput = input.tags;
      // if users are seeded, all the tags belong to the first user
      if (userId) {
        tagsInput = input.tags.map(t => ({
          ...t,
          user: userId
        }));
      }
      const tagsCollection = await connection.db.createCollection('wordtags');
      const createdTags = await tagsCollection.insertMany(tagsInput);
      data.tags = Object.values(createdTags.insertedIds).map(t => t.toString());
    }
  } catch (err) {
    console.error('mongoose seed db error', err);
  }
  return data;
}

export async function dropDb() {
  try {
    await connection.db.dropDatabase();
  } catch (err) {
    console.error('mongoose drop db error', err);
  }
}
