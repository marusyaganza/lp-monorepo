import { Word } from '../../schema/Word';
import {
  calculatePaginationValues,
  GAME_FILTERS,
  getGameFilters,
  getGameSortingFilter,
  getTagsFilter,
  getWordSortingFilters,
  OPTIONS_PROJECTIONS,
  PROJECTIONS
} from '../../helpers';

import {
  Word as WordType,
  NewWordInput,
  UpdateStatisticsInput,
  Game as GameType,
  WordStatisticsField,
  PaginatedWords,
  UpdateWordInput,
  GameDataInput,
  GameConfig,
  SortBy,
  Language,
  WordsPerPageInput,
  SortWordsBy,
  Verb
} from '../../../generated/graphql';
import { getWordsFilters, filterTags } from '../../helpers';
import { UserInputError } from '../../../utils/apolloCustomErrors';
import { DEFAULT_OPTIONS__SAMPLE_SIZE } from '../../../constants/defaultValues';

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
  [GameType.Conjugation]: STATISTICS_FIELD,
  [GameType.Gender]: STATISTICS_FIELD
};

export interface WordModelType {
  findById: (id: string, user: string) => Promise<WordType | null>;
  findOne: (
    filter: Partial<WordType>,
    user: string
  ) => Promise<WordType | null | undefined>;
  findManyAndPaginate: (
    filter: WordsPerPageInput | null | undefined,
    user: string
  ) => Promise<PaginatedWords>;
  findVerbs: (user: string) => Promise<Verb[]>;
  createOne: (fields: NewWordInput, user: string) => Promise<WordType | null>;
  updateOne: (
    update: UpdateWordInput,
    user: string
  ) => Promise<{ ok: boolean; value?: WordType | null }>;
  deleteOne: (id: string, user: string) => Promise<{ ok: boolean }>;
  updateStatistics: (
    data: UpdateStatisticsInput[],
    user: string
  ) => Promise<{ ok: boolean }>;
  selectWordsForGame: (
    filter: GameDataInput,
    config: GameConfig,
    user: string
  ) => Promise<WordType[]>;
  selectWordsForOptions: (
    gameType: GameType,
    language: Language,
    config: GameConfig,
    user: string
  ) => Promise<WordType[]>;
}

export const WordModel: WordModelType = {
  async findById(id, user) {
    const word = await Word.findById(id).populate('tags').exec();
    if (user !== word?.user) {
      return null;
    }

    return word.toObject();
  },

  async findOne(filter, user) {
    const word = await Word.findOne({ ...filter, user })
      .populate('tags')
      .exec();
    return word?.toObject();
  },

  async findManyAndPaginate(filter, user) {
    const sortingFilter = getWordSortingFilters(
      filter?.sortBy || SortWordsBy.UpdatedAt,
      filter?.isReverseOrder
    );
    const filters = getWordsFilters(filter, user);
    const wordsCount = await Word.countDocuments(filters);

    const { limit, hasNext, skip, page } = calculatePaginationValues(
      filter?.limit,
      filter?.page,
      wordsCount
    );

    const words = await Word.find(filters)
      .sort(sortingFilter)
      .limit(limit)
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

  async createOne(fields, user) {
    const { uuid } = fields;
    let existing;
    if (uuid) {
      existing = await Word.findOne({
        uuid,
        user
      });
    }

    if (existing) {
      throw new UserInputError(`word with uuid ${uuid} is already added`);
    }
    const createdAt = Date.now();
    const updatedAt = createdAt;
    const stems = fields?.stems?.length ? fields.stems : [fields.name];
    const transcription = fields?.transcription || fields?.name;
    const isOffensive = !!fields?.isOffensive;
    const { tags } = fields;
    const tagsField = await filterTags({
      tags,
      language: fields.language,
      user
    });
    const word = await Word.create({
      ...fields,
      user,
      createdAt,
      updatedAt,
      stems,
      isOffensive,
      transcription,
      statistics: DEFAULT_STATISTICS,
      tags: tagsField
    });
    return word.toObject();
  },

  async updateOne(fields, user) {
    const updatedAt = Date.now();
    const word = await Word.findOne({ _id: fields.id, user });
    if (!word) {
      return { ok: false };
    }
    const language = word.language;
    const { tags } = fields;
    const tagsUpdate = await filterTags({ tags, language, user });
    const update = { ...fields, tags: tagsUpdate, updatedAt };
    const { acknowledged, modifiedCount } = await word.updateOne(update);
    const updatedWord = await Word.findById(word.id);
    const isOk = modifiedCount == 1 && acknowledged === true;
    return { ok: isOk, value: updatedWord?.toObject() };
  },

  async updateStatistics(data, user) {
    let isOk = true;
    data.forEach(async entry => {
      try {
        const word = await Word.findById(entry.id);
        if (!word || word.user !== user) {
          isOk = false;
          return;
        }
        if (!word?.statistics) {
          word.statistics = DEFAULT_STATISTICS;
        }

        const { gameType, hasError = false } = entry;
        const currentStatistics = word?.statistics?.[gameType];

        if (!currentStatistics) {
          word.statistics[gameType] = DEFAULT_STATISTICS[gameType];
        }

        const newStatistics = {
          practicedTimes: 1,
          errorCount: currentStatistics?.errorCount || 0,
          successRate: currentStatistics?.successRate || 0,
          lastTimePracticed: Date.now()
        };

        if (hasError) {
          newStatistics.errorCount++;
          newStatistics.successRate = 0;
        }

        if (!hasError) {
          newStatistics.successRate++;
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

  async deleteOne(id, user) {
    const result = { ok: false };
    const { deletedCount, acknowledged } = await Word.deleteOne({
      _id: id,
      user
    });
    if (acknowledged && deletedCount == 1) {
      result.ok = true;
    }
    return result;
  },

  async selectWordsForGame(filter, config, user) {
    const { tags, gameType, language, sortBy, isReverseOrder } = filter;

    const tagsFilters = getTagsFilter(tags);
    const gameFilters = getGameFilters(
      gameType,
      config.timesToLearn,
      sortBy === SortBy.MemoryRefresher,
      filter?.tense
    );

    const sortingFilters = getGameSortingFilter(
      gameType,
      sortBy,
      isReverseOrder
    );

    const words = await Word.find(
      { user, language, ...tagsFilters, ...gameFilters },
      PROJECTIONS[gameType]
    )
      .sort(sortingFilters)
      .limit(config.wordsPerGame)
      .exec();
    return words;
  },

  async selectWordsForOptions(gameType, language, config, user) {
    const optionProjections = OPTIONS_PROJECTIONS[gameType];
    const words = Word.find({ language, user }, optionProjections, {
      limit: config.optionsPerGame + DEFAULT_OPTIONS__SAMPLE_SIZE
    });
    return words;
  },

  async findVerbs(user) {
    const verbs = (await Word.find(
      {
        user,
        language: Language.Spanish,
        ...GAME_FILTERS[GameType.Conjugation]
      },
      'name id'
    )
      .sort({ name: 1 })
      .exec()) as Verb[];
    return verbs;
  }
};
