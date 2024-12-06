import { connect } from 'mongoose';
import { seedDB } from './seedDB';
import { DEFAULT_MONGO_CONNECTION } from '../constants/defaultValues';
const connectStr = process.env.MONGO_CONNECTION || DEFAULT_MONGO_CONNECTION;

export async function initDB(cb: () => void, connectString = connectStr) {
  connect(connectString)
    .then(() => {
      cb();
    })
    .catch(err => console.error(err));
  await seedDB();
}
