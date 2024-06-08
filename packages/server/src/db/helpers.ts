import { Document, Types } from 'mongoose';
import {
  Maybe,
  Language,
  Game,
  SortBy,
  SortWordsBy
} from '../generated/graphql';

type ModelDataType = {
  id?: Maybe<string>;
  user?: string;
};

interface DbData extends ModelDataType {
  _id?: string;
}

type DocumentType<T> =
  | (Document<unknown, unknown, T> &
      T & {
        _id: Types.ObjectId;
      })
  | null;

export type WordsFilterType = {
  sortBy?: SortBy | SortWordsBy | 'updatedAt';
  language: Language;
  isReverseOrder: boolean;
  timesToLearn?: number | null;
  gameType?: Game;
  user?: string;
  tags?: string[];
};

export function formatData<T>(data: DocumentType<T>): T | null {
  if (!data) {
    return null;
  }
  return data.toObject({
    getters: true,
    versionKey: false
  });
}

export function formatFilter<T extends DbData>(filter: T): T {
  const id = filter?.id;
  if (id) {
    const formattedFilter = { ...filter, _id: id };
    delete formattedFilter.id;
    return formattedFilter;
  }
  return filter;
}
const NO_TAGS_ID = '000000000000000000000000';

export function getWordsFilters(filter: WordsFilterType) {
  const {
    user,
    language = Language.English,
    sortBy,
    isReverseOrder,
    gameType,
    tags,
    timesToLearn = 5
  } = filter;

  // filter for a specific game
  let gameFilter;
  if (gameType === Game.Conjugation) {
    gameFilter = { conjugation: { $ne: null } };
  }
  if (gameType === Game.Audio) {
    gameFilter = { audioUrl: { $ne: '' } };
  }

  // filter based on tags
  let tagsFilters: { tags: string }[] = [];
  if (tags?.length) {
    tagsFilters = tags
      ?.filter(tag => tag !== NO_TAGS_ID)
      .map(tag => {
        return { tags: tag };
      });
  }

  let noTagsFilter;

  if (tags?.includes(NO_TAGS_ID)) {
    noTagsFilter = { $or: [{ tags: [] }, { tags: null }] };
  }

  // filter based on learning status
  let learningStatusFilters: Record<string, unknown>[] = [];
  if (gameType && sortBy !== SortBy.MemoryRefresher) {
    learningStatusFilters = [
      { isLearned: { $ne: true } },
      {
        $or: [
          { [`statistics.${gameType}.successRate`]: { $lt: timesToLearn } },
          { [`statistics.${gameType}.successRate`]: null }
        ]
      }
    ];
  }
  if (sortBy === SortBy.MemoryRefresher) {
    learningStatusFilters = [
      {
        $or: [
          { [`statistics.${gameType}.successRate`]: { $gte: timesToLearn } },
          { isLearned: true }
        ]
      }
    ];
  }

  //sorting
  let orderNum = isReverseOrder ? -1 : 1;

  // words with the highest number of errors should go first
  if (sortBy === SortBy.ErrorCount) {
    orderNum = -1 * orderNum;
  }

  let sort: Record<string, number> = { $natural: orderNum };

  if (sortBy) {
    let propName: string = sortBy;
    if (gameType) {
      propName = `statistics.${gameType}.${sortBy}`;
    }

    if (sortBy !== SortBy.MemoryRefresher) {
      sort = { [propName]: orderNum };
    }
  }

  const filtersArray = [
    gameFilter,
    noTagsFilter,
    ...tagsFilters,
    ...learningStatusFilters
  ].filter(Boolean);

  const filters: Record<string, unknown> = {
    user,
    language
  };

  if (filtersArray?.length) {
    filters.$and = filtersArray;
  }

  return {
    sort,
    filters
  };
}
