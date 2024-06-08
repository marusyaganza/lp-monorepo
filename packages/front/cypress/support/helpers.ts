import { connect, connection } from 'mongoose';
import { mockUser } from './mocks/mockData';
import { games } from './mocks/games';

export async function connectToDb() {
  try {
    await connect('mongodb://localhost:27017/test');
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

export async function seedDb() {
  try {
    const usersCollection = await connection.db.createCollection('users');
    await usersCollection.insertOne(mockUser);
    const gamesCollection = await connection.db.createCollection('games');
    await gamesCollection.insertMany(games);
  } catch (err) {
    console.error('mongoose drop db error', err);
  }
}
