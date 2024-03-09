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
