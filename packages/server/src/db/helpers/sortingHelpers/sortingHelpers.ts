import { FilterQuery, SortOrder } from 'mongoose';

import {
  Game,
  SortBy,
  SortWordsBy,
  Tense,
  Word,
  WordsPerPageInput
} from '../../../generated/graphql';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_TENSE,
  DEFAULT_WORDS_SORT_BY
} from '../../../constants/defaultValues';
import { IMongooseSortingFilter } from '../../../types/types';

export const NO_TAGS_ID = '000000000000000000000000';

export const GAME_FILTERS: Partial<Record<Game, FilterQuery<Word>>> = {
  [Game.Audio]: { audioUrl: { $nin: ['', null] } },
  [Game.Conjugation]: { conjugation: { $ne: null } }
};

export const PROJECTIONS: Record<Game, string> = {
  [Game.Audio]: 'name audioUrl id defs imgUrl shortDef alternativeSpelling',
  [Game.SelectDef]: 'name audioUrl id defs imgUrl shortDef language',
  [Game.SelectWord]: 'name audioUrl id defs imgUrl shortDef language',
  [Game.TypeWord]: 'name audioUrl id defs imgUrl shortDef alternativeSpelling',
  [Game.Conjugation]: 'name audioUrl id defs imgUrl shortDef conjugation'
};

export const OPTIONS_PROJECTIONS: Partial<Record<Game, string>> = {
  [Game.SelectDef]: 'shortDef id',
  [Game.SelectWord]: 'name id'
};

export function getTagsFilter(tags?: (string | null)[] | null) {
  if (tags?.includes(NO_TAGS_ID)) {
    return { $or: [{ tags: [] }, { tags: null }] };
  }
  return tags?.length
    ? {
        $and: tags.map(tag => ({
          tags: tag
        }))
      }
    : {};
}

export function getTenseFilter(gameType: Game, tense?: Tense | null) {
  return gameType === Game.Conjugation
    ? { 'conjugation.cjid': tense || DEFAULT_TENSE }
    : {};
}

export function getGameFilters(
  gameType: Game,
  timesToLearn: number,
  isMemoryRefresher: boolean,
  tense?: Tense | null
) {
  const learningFilters: FilterQuery<Word> = isMemoryRefresher
    ? {
        $or: [
          { [`statistics.${gameType}.successRate`]: { $gte: timesToLearn } },
          { isLearned: true }
        ]
      }
    : {
        isLearned: { $ne: true },
        $or: [
          { [`statistics.${gameType}.successRate`]: { $lt: timesToLearn } },
          { [`statistics.${gameType}.successRate`]: null }
        ]
      };

  const gameFilters = GAME_FILTERS?.[gameType] || {};
  const tenseFilter = getTenseFilter(gameType, tense);
  return { ...gameFilters, ...learningFilters, ...tenseFilter };
}

export function getGameSortingFilter(
  gameType: Game,
  sortBy?: SortBy | null,
  isReverseOrder?: boolean | null
): IMongooseSortingFilter {
  let orderNum: SortOrder = isReverseOrder ? -1 : 1;

  if (!sortBy) {
    return { $natural: orderNum };
  }

  // words with the highest number of errors should go first
  if (sortBy === SortBy.ErrorCount) {
    orderNum = isReverseOrder ? 1 : -1;
  }
  return { [`statistics.${gameType}.${sortBy}`]: orderNum };
}

export function getWordSortingFilters(
  sortBy: SortWordsBy | null,
  isReverseOrder?: boolean | null
): IMongooseSortingFilter {
  const propName = sortBy || DEFAULT_WORDS_SORT_BY || '$natural';
  let orderNum: SortOrder = isReverseOrder ? -1 : 1;

  if (propName === SortWordsBy.UpdatedAt) {
    orderNum = isReverseOrder ? 1 : -1;
  }
  return { [propName]: orderNum };
}

export function getSearchFilter(searchQuery?: string | null) {
  if (!searchQuery) {
    return {};
  }
  const query = searchQuery.replace(/[^a-z0-9]/gi, '');
  const searchRegexp = { $regex: new RegExp(query, 'i') };
  const searchFilter = {
    $or: [
      { name: searchRegexp },
      { 'defs.def': searchRegexp },
      { alternativeSpelling: searchRegexp },
      { stems: searchRegexp }
    ]
  };
  return searchFilter;
}

export function getWordsFilters(
  filter: WordsPerPageInput | null | undefined,
  user: string
) {
  const minFilter = { user, language: filter?.language || DEFAULT_LANGUAGE };

  if (!filter) {
    return minFilter;
  }
  const tagsFilter = getTagsFilter(filter?.tags);
  const searchFilter = getSearchFilter(filter?.searchQuery);
  const filters = {
    ...minFilter,
    ...searchFilter,
    ...tagsFilter
  };
  return filters;
}
