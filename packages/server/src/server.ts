import 'dotenv/config';
import { createServer } from 'http';
import app from './app';
import { initDB } from './db/initDB';
import { startApolloServer } from './apolloServer';

const PORT = process.env.PORT || 4000;

const server = createServer(app);

initDB(() => {
  startApolloServer(server);
  server.listen(PORT, () => {
    console.log(`server is ready on port ${PORT}🚀`);
  });
}).catch((err: string) => console.error(err));
