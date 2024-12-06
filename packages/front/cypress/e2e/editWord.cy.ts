/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

import { Language } from '../../src/generated/graphql';
import { tags } from '../support/mocks/tags';
import { HEADER_TEXTS } from '../support/constants';
import {
  fullInitialWord,
  fullWordUpdate,
  fullWordResult,
  minInitialWord,
  minWordUpdate,
  minWordResult
} from '../support/mocks/updateWordInputs';
import { editWord } from '../support/helpers/wordForm';

// TODO test form validation
const requiredFields = ['name', 'particle', 'shortDef', 'defs'];
const languages = Object.values(Language);
const queries = {
  [Language.English]: 'wheel',
  [Language.Spanish]: 'asi'
};

const minWordQueries = {
  [Language.English]: 'wheel',
  [Language.Spanish]: 'ser'
};

describe('Edit Word Page', () => {
  beforeEach(() => {
    cy.task('prepareDB', {
      tags: [...tags[Language.English], ...tags[Language.Spanish]]
    });
    cy.login();
    cy.visit('/words/new');
    cy.get('[data-cy="headerNav"] a').as('headerLink');
    cy.getByCy('wordForm').find('button[type="submit"]').as('submitBtn');
    languages.forEach(lang => {
      cy.intercept({
        method: 'GET',
        url: `${minWordResult[lang].audioUrl}`
      }).as(`audioReq-${lang}`);
    });
    cy.clock();
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });
  languages.forEach(lang => {
    it(`should render all the elements correctly, ${lang}`, () => {
      cy.changeLanguage(lang);
      const word = fullInitialWord[lang];
      cy.addWord(queries[lang], word.name);
      cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
      cy.getByCy('wordCard').click();
      cy.getByCy('editButton').click();
      cy.checkWordForm(word);
      cy.get('@submitBtn').should('be.enabled');
      cy.getByCy('backLink').should('have.attr', 'href', '/words');
    });

    it(`should be able to edit and save a word in ${lang}`, () => {
      cy.changeLanguage(lang);
      const word = fullInitialWord[lang];
      const update = fullWordUpdate[lang];
      const result = fullWordResult[lang];
      cy.addWord(queries[lang], word.name);
      cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
      cy.getByCy('wordCard').click();
      cy.getByCy('editButton').click();
      editWord(update);
      cy.get('@submitBtn').click();

      cy.checkNotification(
        'Word updated',
        `Changes for the word ${word.name} were saved`
      );

      cy.checkPathName('/words');
      cy.getByCy('spinner').should('not.exist');

      cy.getByCy('wordCard').first().as('wordCard');

      cy.checkWordCard(result, '@wordCard');

      cy.get('@wordCard').click();
      cy.getByCy('spinner').should('not.exist');
      cy.getByCy('wordCard').as('fullWordCard');

      cy.checkWordCard(result, '@fullWordCard', 'full');
    });

    it(`should be able mark word in ${lang} as learned`, () => {
      cy.changeLanguage(lang);
      const word = fullInitialWord[lang];
      cy.addWord(queries[lang], word.name);
      cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
      cy.getByCy('wordCard').click();
      cy.getByCy('editButton').click();
      editWord({ isLearned: true });
      cy.get('@submitBtn').click();

      cy.checkNotification(
        'Word updated',
        `Changes for the word ${word.name} were saved`
      );

      cy.checkPathName('/words');
      cy.getByCy('spinner').should('not.exist');

      cy.getByCy('wordCard').first().as('wordCard');

      cy.checkWordCard({ ...word, isLearned: true }, '@wordCard');

      cy.get('@wordCard').click();
      cy.getByCy('spinner').should('not.exist');
      cy.getByCy('wordCard').as('fullWordCard');

      cy.checkWordCard({ ...word, isLearned: true }, '@fullWordCard', 'full');
    });

    it(`should be able to edit and save a minimal word in ${lang}`, () => {
      cy.changeLanguage(lang);
      const word = minInitialWord[lang];
      const update = minWordUpdate[lang];
      const result = minWordResult[lang];
      cy.addWord(minWordQueries[lang], word.name);

      cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
      cy.getByCy('wordCard').click();
      cy.getByCy('editButton').click();
      cy.checkWordForm(word);

      editWord(update);
      cy.get('@submitBtn').click();

      cy.checkNotification(
        'Word updated',
        `Changes for the word ${word.name} were saved`
      );

      cy.checkPathName('/words');
      cy.getByCy('spinner').should('not.exist');

      cy.getByCy('wordCard').first().as('wordCard');

      cy.findByCy('audioButton', '@wordCard').click();

      cy.wait(`@audioReq-${lang}`).then(interception => {
        assert.isNotNull(interception?.response?.body, 'audioURL call');
      });

      cy.checkWordCard(result, '@wordCard');

      cy.get('@wordCard').click();
      cy.getByCy('spinner').should('not.exist');
      cy.getByCy('wordCard').as('fullWordCard');

      cy.checkWordCard(result, '@fullWordCard', 'full');
    });
  });
});
