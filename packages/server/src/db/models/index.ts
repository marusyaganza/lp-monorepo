import { UserModel, UserModelType } from './User';
import { WordModel, WordModelType } from './Word';

export interface ModelsType {
  User: UserModelType;
  Word: WordModelType;
}

export const models: ModelsType = {
  User: UserModel,
  Word: WordModel
};
