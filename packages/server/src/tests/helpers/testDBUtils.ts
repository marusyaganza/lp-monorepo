import { connect, connection } from 'mongoose';
import { NewWordInput, User, WordTag } from '../../generated/graphql';

export async function connectToDb() {
  try {
    await connect('mongodb://localhost:27017/server-test', {
      directConnection: true
    });
  } catch (err) {
    console.error('mongoose connection error, ensure MongoDB is running', err);
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
    let userId;
    if (input?.users?.length) {
      const usersCollection = connection.db.collection('users');
      const createdUsers = await usersCollection.insertMany(input.users);
      const users = Object.values(createdUsers.insertedIds).map(u =>
        u.toString()
      );
      data.users = users;
      userId = users[0];
    }

    if (input?.words?.length) {
      let wordsInput = input.words;
      if (userId) {
        wordsInput = input.words.map(w => ({
          ...w,
          user: userId
        }));
      }
      const wordsCollection = connection.db.collection('words');
      const createdWords = await wordsCollection.insertMany(wordsInput);
      data.words = Object.values(createdWords.insertedIds).map(w =>
        w.toString()
      );
    }

    if (input?.tags?.length) {
      let tagsInput = input.tags;
      if (userId) {
        tagsInput = input.tags.map(t => ({
          ...t,
          user: userId
        }));
      }
      const tagsCollection = connection.db.collection('wordtags');
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
    if (connection.readyState === 1 && connection.db) {
      await connection.db.dropDatabase();
    } else {
      console.error(
        'Mongoose connection is not open or DB object is unavailable'
      );
    }
  } catch (err) {
    console.error('mongoose drop db error', err);
  }
}
