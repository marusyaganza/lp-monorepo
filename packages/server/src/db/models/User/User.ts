import { User, UserType } from '../../schema/User';
import { SignUpInput } from '../../../generated/graphql';
import {
  AuthenticationError,
  OperationResolutionError
} from '../../../utils/apolloCustomErrors';
import { DEFAULT_ROLE } from '../../../constants/defaultValues';
import { hashPassword } from '../../../auth';
import { ERROR_MESSAGES } from '../../../constants/errorMessages';

export interface UserModelType {
  findOne: (filter: Partial<UserType>) => Promise<UserType | null | undefined>;
  createOne: (fields: SignUpInput) => Promise<UserType | null>;
}

export const UserModel: UserModelType = {
  async findOne(filter = {}) {
    const { id } = filter;
    let user;
    if (id) {
      user = await User.findById(id);
    } else {
      user = await User.findOne(filter);
    }
    return user?.toObject();
  },

  async createOne(fields) {
    const { email, password } = fields;
    const existing = await User.findOne({ email });
    if (existing) {
      throw new AuthenticationError(`user with email ${email} already exists`);
    }
    const role = DEFAULT_ROLE;
    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
      throw new OperationResolutionError(ERROR_MESSAGES.SIGN_UP_FAILED);
    }
    const createdAt = Date.now();
    const user = await User.create({
      ...fields,
      createdAt,
      role,
      password: hashedPassword
    });
    return user.toObject();
  }
};
