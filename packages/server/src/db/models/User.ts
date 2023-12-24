import { User, UserType } from '../schema/User';
import { SignUpInput, Role } from '../../generated/graphql';
import { formatData, formatFilter } from '../helpers';

export interface UserModelType {
  findOne: (filter: Partial<UserType>) => Promise<UserType | null>;
  findMany: (filter: Partial<UserType>) => Promise<UserType[] | null>;
  createOne: (fields: SignUpInput & { role: Role }) => Promise<UserType | null>;
  updateOne: (
    fields: Partial<UserType>
  ) => Promise<{ ok: boolean; value: UserType | null }>;
  deleteOne: (filter: { id: string }) => Promise<{ ok: boolean }>;
}

export const UserModel: UserModelType = {
  async findOne(filter = {}) {
    const user = await User.findOne(formatFilter(filter));
    return formatData(user);
  },

  //TODO check this method when admin auth is ready
  async findMany(filter = {}) {
    const users = await User.find(formatFilter(filter));
    return users;
  },

  async createOne(fields) {
    const createdAt = Date.now();
    const user = await User.create({ ...fields, createdAt });
    return formatData(user);
  },

  //TODO check this method when GQL for this is ready
  async updateOne(fields) {
    const update = { ...fields };
    delete update.id;
    const { ok, value } = await User.findByIdAndUpdate(fields.id, update, {
      includeResultMetadata: true,
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
