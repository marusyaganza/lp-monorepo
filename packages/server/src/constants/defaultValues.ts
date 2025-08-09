import { Language, Role, SortWordsBy, Tense } from '../generated/graphql';

export const WORDS_PER_PAGE = 5;
export const DEFAULT_LANGUAGE = Language.English;
export const DEFAULT_WORDS_SORT_BY = SortWordsBy.UpdatedAt;
export const DEFAULT_ROLE = Role.Member;
export const DEFAULT_TENSE = Tense.Pind;
export const DEFAULT_TOKEN_TTL = 7;
// to clean db every hour + 10 min just in case
export const DEMO_DB_TTL = 4200;
export const DEFAULT_MONGO_CONNECTION = 'mongodb://localhost:27017';
export const DEFAULT_OPTIONS__SAMPLE_SIZE = 50;
