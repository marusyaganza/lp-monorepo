import { User, Word, SignUpInput, Maybe, AuthUser } from 'generated/graphql';

type UpdateResult = {
  ok: boolean;
  modifiedCount: number;
};

type DeleteResult = {
  ok: boolean;
};

type FindOneFunc<T> = (filter: Partial<T>) => Promise<T>;
type FindManyFunc<T> = (filter: Partial<T>) => Promise<T[]>;
type CreateOneFunc<T> = (filter: Partial<T>) => Promise<T>;
type UpdateOneFunc<T> = (filter: Partial<T>) => Promise<UpdateResult>;
type DeleteOneFunc<T> = (filter: Partial<T>) => Promise<DeleteResult>;

export type ModelType<T> = {
  findOne: FindOneFunc<T>;
  findMany: FindManyFunc<T>;
  createOne: CreateOneFunc<T>;
  updateOne: UpdateOneFunc<T>;
  deleteOne: DeleteOneFunc<T>;
};

// TODO: check if this type can be improved
export type UserModel = User & SignUpInput & AuthUser;

export type ModelsType = {
  Word: ModelType<Word>;
  User: ModelType<UserModel>;
};

export type ModelDataType = {
  id?: Maybe<string>;
  user?: string;
};

export interface DbData extends ModelDataType {
  _id?: string;
}

export enum Table {
  WORD = 'words',
  USER = 'users'
}
