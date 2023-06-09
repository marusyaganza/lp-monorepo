import { Word } from '../schema/Word';
import { Word as WordType, NewWordInput } from '../../generated/graphql';
import { formatFilter, formatData } from '../helpers';

export interface WordModelType {
  findOne: (filter: Partial<WordType>) => Promise<WordType | null>;
  findMany: (filter: Partial<WordType>) => Promise<WordType[] | null>;
  createOne: (fields: NewWordInput) => Promise<WordType | null>;
  updateOne: (
    fields: Partial<WordType> & Pick<WordType, 'id' | 'user'>
  ) => Promise<{ ok: boolean; value: WordType | null }>;
  deleteOne: (filter: {
    id: string;
    user?: string;
  }) => Promise<{ ok: boolean }>;
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
    const word = await Word.create({ ...fields, createdAt });
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
