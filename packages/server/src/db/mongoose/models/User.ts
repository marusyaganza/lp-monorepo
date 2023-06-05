import { Types, Document } from 'mongoose';
import { User } from '../User';
import { User as UserType } from '../../../generated/graphql';
import { ModelType } from '../../';

type DocumentType =
  | (Document<unknown, {}, UserType> &
      Omit<
        UserType & {
          _id: Types.ObjectId;
        },
        never
      >)
  | null;

function formatData(data: DocumentType) {
  if (!data) {
    return null;
  }
  return data.toObject({ getters: true });
}

export const UserModel: ModelType<UserType> = {
  async findOne(filter = {}) {
    const user = await User.findById(filter.id);
    return formatData(user);
  },

  //TODO check this method when admin auth is ready
  async findMany(filter = {}) {
    const users = await User.find(filter);
    return users;
  },

  async createOne(fields) {
    const createdAt = Date.now();
    const user = new User({ ...fields, createdAt });
    await user.save();
    // const user = await User.create({...fields, createdAt});
    // console.log('user', user.toObject({ getters: true }));
    return formatData(user);
  },

  //TODO check this method when GQL for this is ready
  async updateOne(fields) {
    const update = { ...fields };
    delete update.id;
    const { ok, value } = await User.findByIdAndUpdate(fields.id, update, {
      rawResult: true
    });
    return { ok: Boolean(ok), value };
  },

  //TODO check this method when admin auth is ready
  async deleteOne(filter) {
    const result = await User.deleteOne(filter);
    console.log('result', result);
    return { ok: true };
  }
};
