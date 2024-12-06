import { defineConfig } from 'cypress';
import {
  dropDb,
  disconnectFromDb,
  connectToDb,
  seedDb
} from './cypress/support/helpers';
import { WordTag } from './src/generated/graphql';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    viewportWidth: 1300,
    viewportHeight: 1000,
    setupNodeEvents(on, config) {
      on('task', {
        async prepareDB(input?: { tags?: Partial<WordTag>[] }) {
          await connectToDb();
          await dropDb();
          await seedDb(input);
          return null;
        },
        async disconnectFromDb() {
          await dropDb();
          await disconnectFromDb();
          return null;
        }
      });

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--mute-audio');
        }

        return launchOptions;
      });
      // implement node event listeners here
    }
  }
});
