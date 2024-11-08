import { Game, Word, WordTag } from '../generated/graphql';

export type TagType = Omit<WordTag, 'language' | 'user'>;

export type WordType = Omit<Word, 'language' | 'user' | 'createdAt'>;

export interface GameConfigType {
  name: string;
  desc: string;
  type: Game;
}
