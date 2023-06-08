import { Types, Document } from 'mongoose';
import { User, Word } from '../../generated/graphql';
import { DbData } from 'db';

type DocumentType =
  | (Document<unknown, Record<string, any>, User | Word> &
      Omit<
        | User
        | (Word & {
            _id: Types.ObjectId;
          }),
        never
      >)
  | null;

export function formatData(data: DocumentType) {
  if (!data) {
    return null;
  }
  return data.toObject({
    getters: true,
    versionKey: false
  });
}

export function formatFilter<T extends DbData>(filter: T): T {
  const id = filter.id;
  if (id) {
    const formattedFilter = { ...filter, _id: id };
    delete formattedFilter.id;
    return formattedFilter;
  }
  return filter;
}
