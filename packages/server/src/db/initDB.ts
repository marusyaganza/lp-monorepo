import { connect } from 'mongoose';
import { models, ModelsType } from './models';
import { games } from '../mocks/games';
import { Game } from '../db/schema/Game';
const connectStr = process.env.MONGO_CONNECTION || 'mongodb://lp-db:27017';

type initDBFuncType = (
  cb: (model: ModelsType) => void,
  connectString?: string
) => void;

export const initDB: initDBFuncType = async function (
  cb,
  connectString = connectStr
) {
  connect(connectString)
    .then(() => {
      cb(models);
    })
    .catch(err => console.error(err));
  //TODO temporary seeding
  const gamesCount = await Game.countDocuments();
  if (process.env.NODE_ENV === 'development' && gamesCount === 0) {
    await Game.insertMany(games);
  }
};
