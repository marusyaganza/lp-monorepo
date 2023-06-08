import { User } from '../User';
import { User as UserType } from '../../../generated/graphql';
import { ModelType } from '../../';
import { formatData, formatFilter } from '../helpers';

export const UserModel: ModelType<UserType> = {
  // @ts-ignore
  async findOne(filter = {}) {
    const user = await User.findOne(formatFilter(filter));
    return formatData(user);
  },

  //TODO check this method when admin auth is ready
  async findMany(filter = {}) {
    const users = await User.find(formatFilter(filter));
    return users;
  },

  // @ts-ignore
  async createOne(fields) {
    const createdAt = Date.now();
    const user = await User.create({ ...fields, createdAt });
    return formatData(user);
  },

  //TODO check this method when GQL for this is ready
  // @ts-ignore
  async updateOne(fields) {
    const update = { ...fields };
    delete update.id;
    const { ok, value } = await User.findByIdAndUpdate(fields.id, update, {
      rawResult: true,
      new: true
    });
    return { ok: Boolean(ok), value: formatData(value) };
  },

  //TODO check this method when admin auth is ready
  async deleteOne(filter) {
    const result = { ok: false };
    const { deletedCount, acknowledged } = await User.deleteOne(
      formatFilter(filter)
    );
    if (acknowledged && deletedCount == 1) {
      result.ok = true;
    }
    return result;
  }
};
