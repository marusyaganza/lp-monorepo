import { formatIds, formatFilter } from '../../utils/dbUtils';

import { Table, ModelType, DbData } from '..';

const { ObjectId } = require('mongodb');

function createModel<T extends DbData>(db: any, table: Table): ModelType<T> {
  async function findOne(filter = {}) {
    const collection = await db.collection(table);
    const result = await collection.findOne(formatFilter(filter));

    return formatIds(result);
  }

  async function findMany(filter = {}) {
    const result: T[] = await db.collection(table).find(formatFilter(filter));
    const data: T[] = [];
    await result.forEach(doc => {
      data.push(formatIds(doc));
    });
    return data;
  }

  async function createOne(fields: Partial<T>) {
    const data = { ...fields, createdAt: Date.now() };
    if (fields?.user) {
      data.user = ObjectId(fields.user);
    }
    const result = await db.collection(table).insertOne(data);

    return formatIds(result.ops[0]);
  }

  async function updateOne(fields: Partial<T>) {
    const data = { ...fields };
    delete data?.id;
    delete data?.user;
    const result = await db
      .collection(table)
      .updateOne(
        { _id: ObjectId(fields.id), user: ObjectId(fields.user) },
        { $set: { ...data } }
      );
    const isOk = result?.result?.ok ? true : false;
    const modifiedCount = result?.result?.nModified;
    return { ok: isOk, modifiedCount };
  }

  async function deleteOne(filter: Partial<T>) {
    const result = await db.collection(table).deleteOne(formatFilter(filter));
    const isOk = result?.result?.ok ? true : false;
    return { ok: isOk };
  }

  return {
    findOne,
    findMany,
    createOne,
    updateOne,
    deleteOne
  };
}

export default createModel;
