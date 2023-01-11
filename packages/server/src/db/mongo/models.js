const { formatIds, formatFilter } = require('../../utils/dbUtils');
const { ObjectId } = require('mongodb');

function createModel(db, table) {
  async function findOne(filter = {}) {
    const collection = await db.collection(table);
    const result = await collection.findOne(formatFilter(filter));

    return formatIds(result);
  }

  async function findMany(filter = {}) {
    const result = await db.collection(table).find(formatFilter(filter));
    const data = [];
    await result.forEach(doc => {
      data.push(formatIds(doc));
    });
    return data;
  }

  async function createOne(fields) {
    const data = { ...fields, createdAt: Date.now() };
    if (fields?.user) {
      data.user = ObjectId(fields.user);
    }
    const result = await db.collection(table).insertOne(data);

    return formatIds(result.ops[0]);
  }

  async function updateOne(fields) {
    const data = { ...fields };
    delete data.id;
    delete data.user;
    const result = await db
      .collection(table)
      .updateOne(
        { _id: ObjectId(fields.id), user: ObjectId(fields.user) },
        { $set: { ...data } }
      );
    return result?.result;
  }

  async function deleteOne(filter) {
    console.log('filter', filter);
    const result = await db.collection(table).deleteOne(formatFilter(filter));
    return result?.result;
  }

  async function createMany(entries) {
    const formattedEntries = entries.map(entry => ({
      ...entry,
      createdAt: Date.now()
    }));
    const result = await db.collection(table).insertMany(formattedEntries);
    return result.ops.map(formatIds);
  }

  return {
    findOne,
    findMany,
    createOne,
    createMany,
    updateOne,
    deleteOne
  };
}

module.exports = createModel;
