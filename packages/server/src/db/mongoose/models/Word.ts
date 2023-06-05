import { Word } from '../Word';
import { User } from '../User';
import { Word as WordType } from '../../../generated/graphql';
import { ModelType } from '../../';

export const WordModel: ModelType<WordType> = {
  async findOne(filter = {}) {
    const word = await Word.findById(filter.id);
    if (filter.user !== word?.user) {
      return null;
    }
    return word;
  },

  async findMany(filter = {}) {
    const word = await Word.find(filter);
    return word;
  },

  async createOne(fields) {
    const createdAt = Date.now();
    const user = await User.findById(fields.user);
    console.log('user', user);
    const word = await Word.create({ ...fields, createdAt });
    return word;
  },

  async updateOne(fields) {
    const update = { ...fields };
    delete update.id;
    delete update.user;
    const { ok, value } = await Word.findOneAndUpdate(
      { _id: fields.id, user: fields.user },
      update,
      { rawResult: true }
    );
    return { ok: Boolean(ok), value };
  },

  async deleteOne(filter) {
    const word = await Word.findById(filter.id);
    let result = { ok: false };
    if (word && filter.user === word?.user) {
      const { deletedCount, acknowledged } = await Word.deleteOne({
        _id: filter.id
      });
      if (acknowledged && deletedCount == 1) {
        result.ok = true;
      }
    }
    return result;
  }
};
