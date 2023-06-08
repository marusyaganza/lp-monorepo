import { Word } from '../Word';
import { Word as WordType } from '../../../generated/graphql';
import { ModelType } from '../../';
import { formatFilter, formatData } from '../helpers';
// import { UserInputError } from '../../../utils/apolloCustomErrors';

export const WordModel: ModelType<WordType> = {
  // @ts-ignore
  async findOne(filter = {}) {
    if (!filter?.user) {
      return null;
    }
    const word = await Word.findOne(formatFilter(filter));
    return formatData(word);
  },

  // @ts-ignore
  async findMany(filter = {}) {
    if (!filter?.user) {
      return [];
    }
    const words = await Word.find(formatFilter(filter));
    return words;
  },

  // @ts-ignore
  async createOne(fields) {
    const createdAt = Date.now();
    const word = await Word.create({ ...fields, createdAt });
    return formatData(word);
  },

  // @ts-ignore
  async updateOne(fields) {
    const update = { ...fields };
    delete update.id;
    delete update.user;
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
