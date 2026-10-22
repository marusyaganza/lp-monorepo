// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Test data points at real third-party media (Wikimedia, Merriam-Webster, ...).
// Serve local fixtures instead, so tests don't depend on those hosts staying online.
const IMAGE_URLS = [
  'https://upload.wikimedia.org/**',
  'https://cdn.langeek.co/**',
  'https://merriam-webster.com/assets/**',
  'https://www.oxfordlearnersdictionaries.com/**',
  'https://example.com/images/**'
];
const AUDIO_URLS = [
  'https://media.merriam-webster.com/**',
  'https://voice.reverso.net/**',
  'https://example.com/audio/**'
];

beforeEach(() => {
  IMAGE_URLS.forEach(url =>
    cy.intercept(url, { fixture: 'media/image.png,null' })
  );
  AUDIO_URLS.forEach(url =>
    cy.intercept(url, { fixture: 'media/audio.wav,null' })
  );
});
// cypress/support/e2e.js
// import '@cypress/code-coverage/support';

// Alternatively you can use CommonJS syntax:
// require('./commands')
