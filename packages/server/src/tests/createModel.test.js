import { initDb } from './helpers';
import { Table } from '../db';
import createModel from '../db/mongo/models';
import { dbUsers, dbWords } from './mocks/data';

//TODO create tests for all the methods that work with DB
//mock that can be used for this: userCreateInput

const testData = [
  { name: Table.USER, mockData: dbUsers },
  { name: Table.WORD, mockData: dbWords }
];
let _db;

testData.forEach(testModule => {
  describe(`createModel ${testModule.name}`, () => {
    let collection;
    beforeAll(async () => {
      _db = await initDb();
      testModule.model = await createModel(_db, testModule.name);
      collection = await _db.collection(testModule.name);
    });
    afterAll(() => {
      if (collection) {
        collection.drop();
      }
    });
    test('deleteOne', async () => {
      await collection.insertMany(testModule.mockData);
      const id = testModule.mockData[0]._id;
      const before = await testModule.model.findMany();
      //TODO figure out why before and after have the same snapshot
      // expect(before).toMatchSnapshot();
      const result = await testModule.model.deleteOne({ id });
      const deletedItem = await testModule.model.findMany({ id });
      expect(result).toEqual({ ok: true });
      expect(deletedItem).toEqual([]);
      const after = await testModule.model.findMany();
      // expect(after).toMatchSnapshot();
    });
  });
});
