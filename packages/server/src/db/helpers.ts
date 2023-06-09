import { Document } from 'mongoose';
import { User, Word, Maybe } from '../generated/graphql';

type ModelDataType = {
  id?: Maybe<string>;
  user?: string;
};

interface DbData extends ModelDataType {
  _id?: string;
}

type DocumentType = Document<
  unknown,
  Record<string, string>,
  User | Word
> | null;

export function formatData<T>(data: DocumentType): T | null {
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
