import { connect } from 'mongoose';
import { ModelsType } from '..';
import { models } from './models';

// const connectStr = process.env.MONGO_CONNECTION || 'mongodb://lp-db:27017';
const connectStr = 'mongodb://localhost:27017/';

type initDBType = (cb: (model: ModelsType) => void, connectString?: string) => void;

export const initDB: initDBType = async function (cb, connectString=connectStr) {
  connect(connectString)
    .then(() => {
      // @ts-ignore
      cb(models);
    })
    .catch(err => console.log(err));
}; 
