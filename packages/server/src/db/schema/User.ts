import { Schema, model } from 'mongoose';
import { User as UserCoreType } from '../../generated/graphql';
import { DEMO_DB_TTL } from '../../constants/defaultValues';

export interface UserType extends UserCoreType {
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<UserType>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, required: true, default: Date.now },
    role: { type: String, enum: ['ADMIN', 'GUEST', 'MEMBER'], required: true },
    password: { type: String, required: true },
    primaryLanguage: String
  },
  { toObject: { virtuals: true, getters: true, versionKey: false } }
);

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// clean up user data every hour in demo mode
if (process.env.DEMO_VERSION === 'true') {
  userSchema.index({ createdAt: 1 }, { expireAfterSeconds: DEMO_DB_TTL });
}

export const User = model<UserType>('User', userSchema);
