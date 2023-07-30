import { Word } from '../schema/Word';
import {
  Word as WordType,
  NewWordInput,
  UpdateStatisticsInput
} from '../../generated/graphql';
import { formatFilter, formatData } from '../helpers';

export interface WordModelType {
  findOne: (filter: Partial<WordType>) => Promise<WordType | null>;
  findMany: (filter: Partial<WordType>) => Promise<WordType[] | null>;
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
      transcription
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
      const { ok, value } = await Word.findOneAndUpdate(
        { _id: entry.id, user },
        update,
        { rawResult: true, new: true }
      );
      isOk = isOk && ok == 1 && value !== null;
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
        const statistics = word?.statistics;
        const newStatistics = {
          practicedTimes: 1,
          errorCount: entry.hasError ? 1 : 0,
          lastTimePracticed: Date.now()
        };
        if (statistics?.practicedTimes && statistics?.errorCount) {
          newStatistics.practicedTimes += statistics.practicedTimes;
          newStatistics.errorCount += statistics.errorCount;
        }
        word.statistics = newStatistics;
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
