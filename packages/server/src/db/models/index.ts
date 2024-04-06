import { UserModel, UserModelType } from './User';
import { WordModel, WordModelType } from './Word';
import { WordTagModel, WordTagModelType } from './WordTag';

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
