import { GAMES } from '../constants/games';
import { Game } from './schema/Game';

export async function seedDB() {
  const gamesCount = await Game.countDocuments();
  if (process.env.NODE_ENV === 'development' && gamesCount === 0) {
    await Game.insertMany(GAMES);
  }
}
