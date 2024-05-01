import { UserModel, UserModelType } from './User';
import { WordModel, WordModelType } from './Word';
import { WordTagModel, WordTagModelType } from './WordTag';
import { GameModel, GameModelType } from './Game';

export interface ModelsType {
  User: UserModelType;
  Word: WordModelType;
  WordTag: WordTagModelType;
  Game: GameModelType;
}

export const models: ModelsType = {
  User: UserModel,
  Word: WordModel,
  WordTag: WordTagModel,
  Game: GameModel
};
