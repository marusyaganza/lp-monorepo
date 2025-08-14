import { ModelsType } from '../db/models';

import { createToken, validatePassword, hashPassword } from '../auth';
import {
  GameData,
  GameDataInput,
  Role,
  WordDefinition,
  Word,
  GameSettings
} from '../generated/graphql';
import { SortOrder } from 'mongoose';
import { generateGameData } from '../generateGameData/index';
import { searchWord } from '../dictionary/searchWord';

export interface IUserTokenInfo {
  id: string;
  role: Role;
}

export interface IContext {
  models: ModelsType;
  createToken: typeof createToken;
  validatePassword: typeof validatePassword;
  hashPassword: typeof hashPassword;
  searchWord: typeof searchWord;
  generateGameData: typeof generateGameData;
}

export interface IResolverContext extends IContext {
  user?: IUserTokenInfo;
}

export interface IAutenticatedContext extends IContext {
  user: IUserTokenInfo;
}

export interface IMongooseSortingFilter {
  [key: string]: SortOrder;
}

export type GameDataGeneratorFunc = (
  words: Word[],
  parameters: GameDataInput,
  config: GameSettings,
  user: string
) => Promise<GameData>;

export interface IWordWithAudio {
  name: string;
  audioUrl: string;
  id: string;
  defs: WordDefinition[];
  imgUrl?: string;
  shortDef: string[];
  alternativeSpelling?: string[];
}

export interface IWordWithImage {
  imgUrl: string;
  name: string;
  audioUrl?: string;
  id: string;
  defs: WordDefinition[];
  shortDef: string[];
  alternativeSpelling?: string[];
}

export interface IMinimalWord {
  id?: string;
  name: string;
  shortDef: string[];
}
