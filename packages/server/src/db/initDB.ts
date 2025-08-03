import { connect } from 'mongoose';
import { DEFAULT_MONGO_CONNECTION } from '../constants/defaultValues';
const connectStr = process.env.MONGO_CONNECTION || DEFAULT_MONGO_CONNECTION;

export async function initDB(connectString = connectStr) {
  connect(connectString).catch(err => console.error(err));
}
