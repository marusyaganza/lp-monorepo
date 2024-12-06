import { GAMES } from '../constants/games';
import { Game } from './schema/Game';

export async function seedDB() {
  if (process.env.NODE_ENV === 'development') {
    const gamesCount = await Game.countDocuments();
    if (gamesCount === 0) {
      await Game.insertMany(GAMES);
    }
  }
}
