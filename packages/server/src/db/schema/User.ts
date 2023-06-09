import { Schema, model } from 'mongoose';
import { User as UserCoreType } from 'generated/graphql';

export interface UserType extends UserCoreType {
  password: string;
  primaryLanguage?: string;
}

const userSchema = new Schema<UserType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'GUEST', 'MEMBER'], required: true },
  password: { type: String, required: true },
  primaryLanguage: String
});

export const User = model<UserType>('User', userSchema);
