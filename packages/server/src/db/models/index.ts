import { UserModel, UserModelType } from './User/User';
import { WordModel, WordModelType } from './Word/Word';
import { WordTagModel, WordTagModelType } from './WordTag/WordTag';

export interface ModelsType {
  User: UserModelType;
  Word: WordModelType;
  WordTag: WordTagModelType;
}

export const models: ModelsType = {
  User: UserModel,
  Word: WordModel,
  WordTag: WordTagModel
};
