import { Document, Types } from 'mongoose';
import { Maybe } from '../generated/graphql';

type ModelDataType = {
  id?: Maybe<string>;
  user?: string;
};

interface DbData extends ModelDataType {
  _id?: string;
}

type DocumentType<T> =
  | (Document<unknown, unknown, T> &
      T & {
        _id: Types.ObjectId;
      })
  | null;

export function formatData<T>(data: DocumentType<T>): T | null {
  if (!data) {
    return null;
  }
  return data.toObject({
    getters: true,
    versionKey: false
  });
}

export function formatFilter<T extends DbData>(filter: T): T {
  const id = filter?.id;
  if (id) {
    const formattedFilter = { ...filter, _id: id };
    delete formattedFilter.id;
    return formattedFilter;
  }
  return filter;
}
