import { GameConfig, Language } from '../../generated/graphql';
import { formatData, formatFilter } from '../helpers';
import { Game } from '../schema/Game';
// import { games as gamesMock } from '../../mocks/games';

export interface GameFilterType extends Partial<GameConfig> {
  languages?: Language;
}

export interface GameModelType {
  findOne: (filter: GameFilterType) => Promise<GameConfig | null>;
  findMany: (filter: GameFilterType) => Promise<GameConfig[] | null>;
}

export const GameModel: GameModelType = {
  async findOne(filter) {
    const game = await Game.findOne(formatFilter(filter));
    return formatData(game);
  },

  async findMany(filter) {
    const games = await Game.find(formatFilter(filter));
    // await Game.insertMany(gamesMock);
    return games;
  }
};
