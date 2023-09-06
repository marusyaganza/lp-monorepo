import { Word } from '../schema/Word';
import {
  Word as WordType,
  NewWordInput,
  UpdateStatisticsInput,
  GameDataInput,
  Language,
  Game
} from '../../generated/graphql';
import { formatFilter, formatData } from '../helpers';

const STATISTICS_FIELD = {
  lastTimePracticed: 0,
  practicedTimes: 0,
  errorCount: 0
};

const DEFAULT_STATISTICS = {
  [Game.Audio]: STATISTICS_FIELD,
  [Game.SelectDef]: STATISTICS_FIELD,
  [Game.SelectWord]: STATISTICS_FIELD,
  [Game.TypeWord]: STATISTICS_FIELD
};

export interface WordModelType {
  findOne: (filter: Partial<WordType>) => Promise<WordType | null>;
  findMany: (filter: Partial<WordType>) => Promise<WordType[] | null>;
  findManyAndSort: (
    filter: Required<GameDataInput & { user?: string }>
  ) => Promise<WordType[] | null>;
  createOne: (fields: NewWordInput) => Promise<WordType | null>;
  updateOne: (
    fields: Partial<WordType> & Pick<WordType, 'id' | 'user'>
  ) => Promise<{ ok: boolean; value: WordType | null }>;
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
    const word = await Word.findOne(formatFilter(filter));
    return formatData(word);
  },

  async findMany(filter) {
    if (!filter?.user) {
      return [];
    }
    const words = await Word.find(formatFilter(filter));
    return words;
  },

  // Check if criteria is defined, if so => sort by criteria, else use natural sorting
  async findManyAndSort(filter) {
    const {
      user,
      language = Language.English,
      sortBy,
      isReverseOrder,
      gameType
    } = filter;
    if (!user) {
      return [];
    }
    const orderNum = isReverseOrder ? -1 : 1;
    let sort: Record<string, number> = { $natural: orderNum };
    if (sortBy) {
      const propName = `statistics.${gameType}.${sortBy}`;
      sort = { [propName]: orderNum };
    }
    // @ts-ignore
    const words = await Word.find({ user, language }).sort(sort);
    return words;
  },

  async createOne(fields) {
    const createdAt = Date.now();
    const stems = fields?.stems?.length ? fields.stems : [fields.name];
    const transcription = fields?.transcription || fields?.name;
    const isOffensive = !!fields?.isOffensive;
    const word = await Word.create({
      ...fields,
      createdAt,
      stems,
      isOffensive,
      transcription,
      statistics: DEFAULT_STATISTICS
    });
    return formatData(word);
  },

  async updateOne(fields) {
    const update = { ...fields };
    const { ok, value } = await Word.findOneAndUpdate(
      { _id: fields.id, user: fields.user },
      update,
      { rawResult: true, new: true }
    );
    const isOk = ok == 1 && value !== null;
    return { ok: isOk, value: formatData(value) };
  },

  // This method do not have a practical use for now
  async updateMany(data, user) {
    let isOk = true;
    data.forEach(async entry => {
      const update = { ...entry };
      const result = await Word.findOneAndUpdate(
        { _id: entry.id, user },
        update,
        { rawResult: true, new: true }
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
        const newStatistics = {
          practicedTimes: 1,
          errorCount: entry.hasError ? 1 : 0,
          lastTimePracticed: Date.now()
        };
        const gameType = entry.gameType;
        const currentStatistics = word?.statistics?.[gameType];
        if (
          currentStatistics?.practicedTimes &&
          currentStatistics?.errorCount
        ) {
          newStatistics.practicedTimes += currentStatistics.practicedTimes;
          newStatistics.errorCount += currentStatistics.errorCount;
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
