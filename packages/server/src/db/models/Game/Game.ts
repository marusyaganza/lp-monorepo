import {
  GameConfig,
  Language,
  Game as GameType
} from '../../../generated/graphql';
import { Game } from '../../schema/Game';

export interface GameFilterType {
  languages?: Language;
  type?: GameType;
}

export interface GameModelType {
  findOne: (filter: GameFilterType) => Promise<GameConfig | null | undefined>;
  findMany: (
    filter: GameFilterType
  ) => Promise<GameConfig[] | null | undefined>;
}

export const GameModel: GameModelType = {
  async findOne(filter) {
    const game = await Game.findOne(filter);
    return game?.toObject();
  },

  async findMany(filter) {
    const games = await Game.find(filter).sort('orderNum').exec();
    return games;
  }
};
