import {
  createToken,
  getUserFromToken,
  hashPassword,
  validatePassword
} from './auth';
import { models } from './db/models';
import { searchWord } from './dictionary/searchWord';
import { generateGameData } from './generateGameData/index';
import { IncomingMessage } from 'http';

export async function context({ req }: { req: IncomingMessage }) {
  const token = req?.headers?.authorization?.split(' ').pop();
  const user = token ? getUserFromToken(token) : undefined;
  return {
    models,
    user,
    createToken,
    validatePassword,
    hashPassword,
    searchWord,
    generateGameData
  };
}
