import { QueryOptions } from 'mongoose';
import { Word } from '../schema/Word';
import { WordTag } from '../schema/WordTag';
import { Game } from '../schema/Game';

import {
  Word as WordType,
  NewWordInput,
  UpdateStatisticsInput,
  Game as GameType,
  WordStatisticsField,
  PaginatedWords
} from '../../generated/graphql';
import {
  formatFilter,
  formatData,
  getWordsFilters,
  WordsFilterType,
  WordsWithPaginationFilter
} from '../helpers';

const STATISTICS_FIELD: WordStatisticsField = {
  lastTimePracticed: 0,
  practicedTimes: 0,
  errorCount: 0,
  successRate: 0
};

const DEFAULT_STATISTICS: Record<GameType, WordStatisticsField> = {
  [GameType.Audio]: STATISTICS_FIELD,
  [GameType.SelectDef]: STATISTICS_FIELD,
  [GameType.SelectWord]: STATISTICS_FIELD,
  [GameType.TypeWord]: STATISTICS_FIELD,
  [GameType.Conjugation]: STATISTICS_FIELD
};

export interface WordModelType {
  findOne: (filter: Partial<WordType>) => Promise<WordType | null>;
  findMany: (
    filter: Partial<WordType>,
    projection: string,
    options?: QueryOptions
  ) => Promise<WordType[] | null>;
  findManyAndSort: (filter: WordsFilterType) => Promise<WordType[] | null>;
  findManyAndPaginate: (
    filter: WordsWithPaginationFilter
  ) => Promise<PaginatedWords | null>;
  createOne: (fields: NewWordInput) => Promise<WordType | null>;
  updateOne: (
    fields: Partial<WordType> & Pick<WordType, 'id' | 'user'>
  ) => Promise<{ ok: boolean; value?: WordType | null }>;
  updateMany: (
    fields: Partial<WordType> & Pick<WordType, 'id'>[],
    user?: string
  ) => Promise<{ ok: boolean }>;
  deleteOne: (filter: {
    id: string;
    user?: string;
  }) => Promise<{ ok: boolean }>;
  updateStatistics: (
    data: UpdateStatisticsInput[],
    user?: string
  ) => Promise<{ ok: boolean }>;
}

export const WordModel: WordModelType = {
  async findOne(filter) {
    if (!filter?.user) {
      return null;
    }
    const word = await Word.findOne(formatFilter(filter))
      .populate('tags')
      .exec();
    return formatData(word);
  },

  async findMany(filter, projection, options) {
    if (!filter?.user) {
      return [];
    }
    const words = await Word.find(formatFilter(filter), projection, options)
      .populate('tags')
      .exec();
    return words;
  },

  async findManyAndSort(filter) {
    const { user } = filter;

    if (!user) {
      return [];
    }

    const { sort, filters } = getWordsFilters(filter);

    const words = await Word.find(filters)
      // @ts-ignore
      .sort(sort)
      .populate('tags')
      .exec();

    return words;
  },

  async findManyAndPaginate(filter) {
    const { page = 1, limit = 5 } = filter;
    const docsLimit = Math.abs(limit);
    const skip = (Math.abs(page) - 1) * docsLimit;
    const { user } = filter;

    if (!user) {
      return null;
    }

    const { sort, filters } = getWordsFilters(filter);
    const wordsCount = await Word.countDocuments(filters);
    const hasNext = wordsCount - Math.abs(page) * limit > 0;
    const words = await Word.find(filters)
      // @ts-ignore
      .sort(sort)
      .limit(docsLimit)
      .skip(skip)
      .populate('tags')
      .exec();

    const result: PaginatedWords = {
      words,
      page,
      limit,
      hasNext,
      wordsCount
    };

    return result;
  },

  async createOne(fields) {
    const createdAt = Date.now();
    const updatedAt = createdAt;
    const stems = fields?.stems?.length ? fields.stems : [fields.name];
    const transcription = fields?.transcription || fields?.name;
    const isOffensive = !!fields?.isOffensive;
    const word = await Word.create({
      ...fields,
      createdAt,
      updatedAt,
      stems,
      isOffensive,
      transcription,
      statistics: DEFAULT_STATISTICS
    });
    return formatData(word);
  },

  async updateOne(fields) {
    const updatedAt = Date.now();
    const word = await Word.findOne({ _id: fields.id, user: fields.user });
    if (!word) {
      return { ok: false };
    }
    const language = word.language;
    const { user, tags } = fields;
    let existingTags = await WordTag.find({ user, language }, 'id');
    existingTags = existingTags.map(tag => tag.id);
    // @ts-ignore
    const tagsUpdate = tags?.filter(tag => existingTags.includes(tag));
    const update = { ...fields, tags: tagsUpdate, updatedAt };
    const { acknowledged, modifiedCount } = await word.updateOne(update);
    const updatedWord = await Word.findById(word.id);
    const isOk = modifiedCount == 1 && acknowledged === true;
    return { ok: isOk, value: formatData(updatedWord) };
  },

  // This method do not have a practical use for now
  async updateMany(data, user) {
    let isOk = true;
    const updatedAt = Date.now();
    data.forEach(async entry => {
      const update = { ...entry, updatedAt };
      const result = await Word.findOneAndUpdate(
        { _id: entry.id, user },
        update,
        { includeResultMetadata: true, new: true }
      );
      isOk = isOk && result?.ok == 1 && result?.value !== null;
    });

    return { ok: isOk };
  },

  async updateStatistics(data) {
    let isOk = true;
    data.forEach(async entry => {
      try {
        const word = await Word.findById(entry.id);
        if (!word) {
          isOk = false;
          return;
        }
        if (!word?.statistics) {
          word.statistics = DEFAULT_STATISTICS;
        }

        const { gameType, hasError = false, isLearned = false } = entry;
        const gameConfig = await Game.findOne({ type: gameType });
        const timesToLearn = gameConfig?.timesToLearn || 5;

        const currentStatistics = word?.statistics?.[gameType];

        if (!currentStatistics) {
          word.statistics[gameType] = DEFAULT_STATISTICS[gameType];
        }

        const newStatistics = {
          practicedTimes: 1,
          errorCount: currentStatistics?.errorCount ?? 0,
          successRate: currentStatistics?.successRate ?? 0,
          lastTimePracticed: Date.now()
        };

        if (hasError) {
          newStatistics.errorCount++;
          newStatistics.successRate = 0;
        }

        if (!hasError) {
          newStatistics.successRate++;
        }

        if (isLearned) {
          newStatistics.successRate = timesToLearn;
        }

        if (currentStatistics?.practicedTimes) {
          newStatistics.practicedTimes += currentStatistics.practicedTimes;
        }

        word.statistics[gameType] = newStatistics;
        await word.save();
      } catch (err) {
        console.error('saving statisticks failed', err);
        isOk = false;
      }
    });
    return { ok: isOk };
  },

  async deleteOne(filter) {
    const result = { ok: false };
    const { deletedCount, acknowledged } = await Word.deleteOne({
      _id: filter.id,
      user: filter.user
    });
    if (acknowledged && deletedCount == 1) {
      result.ok = true;
    }
    return result;
  }
};
