import { Game, Tense } from '../../src/generated/graphql';

export const USER_CREDS = {
  email: 'test@test.com',
  password: '123Password!'
};

export const TEXTS_BY_PAGE = {
  home: {
    mainHeading: 'The Power of Learning Languages'
  },
  newWord: {
    mainHeading: 'Add new word'
  },
  words: {
    addWordLink: 'Add new'
  },
  search: {
    mainHeading: 'Look up word',
    addWordLink: 'Add your own word'
  },
  vocabulary: {
    mainHeading: 'Vocabulary',
    addWordLink: 'Add new'
  },
  signIn: {
    mainHeading: 'Sign in',
    signUpLink: 'Sign up'
  },
  signUp: {
    mainHeading: 'Sign up',
    signInLink: 'Sign in'
  },
  tags: {
    mainHeading: 'Manage your tags',
    newTagBtn: 'Create new tag'
  }
};

export const HEADER_TEXTS = {
  vocabulary: 'Vocabulary',
  explore: 'Explore',
  practice: 'Practice',
  tags: 'Tags'
};

export const tasks = {
  [Game.Audio]: "Type the word that you've heard",
  [Game.SelectDef]: 'Select a definition that means ',
  [Game.SelectWord]: 'Select a word that means ',
  [Game.TypeWord]: 'Type a word that means '
};

export enum GameStage {
  Initial = 'initial',
  Success = 'success',
  Error = 'error'
}

export const TENSES: Record<Tense, string> = {
  pind: 'Presente indicativo',
  pprf: 'Pretérito perfecto simple',
  impf: 'Imperativo',
  pret: 'Pretérito imperfecto'
};
