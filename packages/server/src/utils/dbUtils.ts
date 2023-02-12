const { ObjectId } = require('mongodb');
import { DbData } from 'db';

export function formatIds<T extends DbData>(data: T): T {
  if (data?._id) {
    return { ...data, id: data._id };
  }
  return data;
}

export function formatFilter<T extends DbData>(data: T): T {
  const filters = { ...data };
  if (data?.id) {
    filters._id = ObjectId(data.id);
    delete filters.id;
  }
  if (data?.user) {
    filters.user = ObjectId(data.user);
  }
  return filters;
}
