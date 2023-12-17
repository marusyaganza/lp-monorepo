import { defineConfig } from 'cypress';
import {
  dropDb,
  disconnectFromDb,
  connectToDb,
  seedDb
} from './cypress/support/helpers';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      on('task', {
        async prepareDB() {
          await connectToDb();
          dropDb();
          seedDb();
          return null;
        },
        async disconnectFromDb() {
          await disconnectFromDb();
          return null;
        }
      });
      // implement node event listeners here
    }
  }
});
