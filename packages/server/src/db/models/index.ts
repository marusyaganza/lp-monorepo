import { UserModel, UserModelType } from './User/User';
import { WordModel, WordModelType } from './Word/Word';
import { WordTagModel, WordTagModelType } from './WordTag/WordTag';
import { GameModel, GameModelType } from './Game/Game';

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
