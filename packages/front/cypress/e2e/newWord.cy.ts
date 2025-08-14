/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

import { Language } from '../../src/generated/graphql';
import { TEXTS_BY_PAGE } from '../support/constants';

import {
  fullWord,
  minNewWord,
  shortOffensiveWord,
  wordWithTag
} from '../support/mocks/newWordInputs';
import { tags } from '../support/mocks/tags';

const TEXTS = TEXTS_BY_PAGE.newWord;

const labels = {
  name: 'name',
  particle: 'word category',
  shortDef: 'short definition 1',
  tags: 'tags',
  stems: 'word form 1',
  audioUrl: 'audio url',
  imgUrl: 'image url',
  imgDesc: 'image description',
  alternativeSpelling: 'alternative spelling 1',
  additionalInfo: 'additional information',
  transcription: 'transcription',
  isOffensive: 'offensive'
};

const textFields = [
  'name',
  'particle',
  'shortDef',
  'stems',
  'audioUrl',
  'imgUrl',
  'imgDesc',
  'alternativeSpelling',
  'additionalInfo',
  'transcription'
];

const requiredFields = ['name', 'particle', 'shortDef', 'defs'];
const languages = Object.values(Language);

describe('New Word Page', () => {
  beforeEach(() => {
    cy.task('prepareDB', {
      tags: [...tags[Language.English], ...tags[Language.Spanish]]
    });
    cy.login();
    cy.visit('/words/new');
    cy.get('[data-cy="headerNav"] a').as('headerLink');
    cy.getByCy('wordForm').find('button[type="submit"]').as('submitBtn');
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });
  languages.forEach(lang => {
    it(`should render all the elements correctly with ${lang}`, () => {
      cy.changeLanguage(lang);
      cy.get('h1').should('have.text', TEXTS.mainHeading);

      const fields = Object.keys(labels);
      fields.forEach(key => {
        cy.getByCy(`formField-${key}`).find('label').contains(labels[key]);
      });

      textFields.forEach(key => {
        cy.getByCy(`formField-${key}`)
          .as('field')
          .find('textarea')
          .should('be.empty');
        cy.get('@field').find('[data-cy="input-error"]').should('be.empty');
      });

      cy.getByCy('definition-1')
        .as('defInput')
        .find('label')
        .contains('definition 1');

      cy.getByCy('exampleInput')
        .as('exampleInput')
        .find('label')
        .contains('example 1');

      cy.get('@defInput').find('textarea').should('be.empty');
      cy.get('@defInput')
        .find('[data-cy="button-plus"]')
        .contains('add definition')
        .click({ force: true });
      cy.getByCy('definition-2').find('textarea').should('be.empty');
      cy.get('@exampleInput').should('have.length', 2);
      cy.get('@defInput').find('[data-cy="button-minus"]').click();
      cy.getByCy('definition-2').should('not.exist');

      cy.get('@exampleInput').find('textarea').should('be.empty');

      cy.get('@exampleInput')
        .find('[data-cy="button-plus"]')
        .should('be.enabled')
        .click();

      cy.get('@exampleInput').should('have.length', 2);

      cy.get('@exampleInput')
        .find('[data-cy="button-minus"]')
        .should('be.enabled')
        .click();

      cy.get('@exampleInput').should('have.length', 1);

      cy.get('@submitBtn').should('have.text', 'Save').should('be.enabled');

      cy.getByCy('formField-isOffensive')
        .find('input')
        .should('not.be.checked');

      cy.getByCy('backLink').should('have.attr', 'href', '/words');
    });

    it(`should validate the form with ${lang} language`, () => {
      cy.changeLanguage(lang);

      const wordInput = minNewWord[lang];

      cy.get('@submitBtn').click();
      requiredFields.forEach(key => {
        cy.getByCy(`formField-${key}`)
          .find('[data-cy="input-error"]')
          .should('be.visible');
      });

      cy.checkPathName('/words/new');

      cy.fillWordForm(wordInput);

      cy.get('@submitBtn').click();
      cy.checkPathName('/words');
      cy.checkNotification(
        'Word added',
        `${wordInput.name} is added successfully`,
        true
      );

      cy.getByCy('spinner').should('not.exist');

      cy.getByCy('wordCard').first().as('wordCard');

      cy.checkWordCard(wordInput, '@wordCard');
    });

    it(`should be able to fill the form and save a word in ${lang}`, () => {
      cy.changeLanguage(lang);
      const wordInput = fullWord[lang];
      cy.fillWordForm(wordInput);
      cy.get('@submitBtn').click();
      cy.checkNotification(
        'Word added',
        `${wordInput.name} is added successfully`,
        true
      )
        .find('button')
        .click();

      cy.checkPathName('/words');
      cy.getByCy('spinner').should('not.exist');

      cy.getByCy('wordCard').first().as('wordCard');

      cy.findByCy('audioButton', '@wordCard').click();

      cy.checkWordCard(wordInput, '@wordCard');

      cy.get('@wordCard').click();
      cy.getByCy('spinner').should('not.exist');
      cy.getByCy('wordCard').as('fullWordCard');

      cy.checkWordCard(wordInput, '@fullWordCard', 'full');
    });

    it(`should save an offensive word in ${lang} with minimal data`, () => {
      cy.changeLanguage(lang);
      const wordInput = shortOffensiveWord[lang];
      cy.fillWordForm(wordInput);
      cy.get('@submitBtn').click();
      cy.checkNotification(
        'Word added',
        `${wordInput.name} is added successfully`,
        true
      );
      cy.getByCy('spinner').should('not.exist');
      cy.checkPathName('/words');
      cy.getByCy('wordCard').first().as('wordCard');
      cy.checkWordCard(wordInput, '@wordCard');

      cy.get('@wordCard').click();
      cy.getByCy('spinner').should('not.exist');
      cy.getByCy('wordCard').as('fullWordCard');

      cy.checkWordCard(wordInput, '@fullWordCard', 'full');
    });

    it(`should save 2 words in ${lang}`, () => {
      cy.changeLanguage(lang);
      const wordInput = fullWord[lang];
      const wordInput2 = shortOffensiveWord[lang];

      cy.getByCy('wordForm')
        .find('textarea')
        .each($el => {
          cy.wrap($el).should('be.empty');
        });

      cy.fillWordForm(wordInput);
      cy.get('@submitBtn').click();
      cy.checkNotification(
        'Word added',
        `${wordInput.name} is added successfully`,
        true
      );
      cy.getByCy('spinner').should('not.exist');
      cy.checkPathName('/words');
      cy.getByCy('wordCard').first().as('wordCard');
      cy.checkWordCard(wordInput, '@wordCard');

      cy.get('@wordCard').click();
      cy.getByCy('spinner').should('not.exist');
      cy.getByCy('wordCard').as('fullWordCard');

      cy.checkWordCard(wordInput, '@fullWordCard', 'full');

      cy.get('@headerLink').contains('Vocabulary').click();
      cy.get('a').contains(TEXTS_BY_PAGE.words.addWordLink).click();
      cy.checkPathName('/words/new');

      cy.getByCy('wordForm')
        .find('textarea')
        .each($el => {
          cy.wrap($el).should('be.empty');
        });

      cy.fillWordForm(wordInput2);

      cy.get('@submitBtn').click();

      cy.checkNotification(
        'Word added',
        `${wordInput2.name} is added successfully`,
        true
      );

      cy.getByCy('spinner').should('not.exist');

      cy.checkPathName('/words');

      cy.getByCy('wordCard').should('have.length', 2);

      cy.getByCy('wordCard').first().as('wordCard');
      cy.checkWordCard(wordInput2, '@wordCard');

      cy.getByCy('wordCard').eq(1).as('wordCard2');
      cy.checkWordCard(wordInput, '@wordCard2');

      cy.get('@wordCard').click();
      cy.getByCy('spinner').should('not.exist');
      cy.getByCy('wordCard').as('fullWordCard');

      cy.checkWordCard(wordInput2, '@fullWordCard', 'full');
    });

    it(`should save a word in ${lang} with tags`, () => {
      cy.changeLanguage(lang);
      const wordInput = wordWithTag[lang];
      cy.fillWordForm(wordInput);

      cy.get('@submitBtn').click();
      cy.checkNotification(
        'Word added',
        `${wordInput.name} is added successfully`,
        true
      );
      cy.getByCy('spinner').should('not.exist');
      cy.checkPathName('/words');
      cy.getByCy('wordCard').first().as('wordCard');
      cy.checkWordCard(wordInput, '@wordCard');

      cy.get('@wordCard').click();
      cy.getByCy('spinner').should('not.exist');
      cy.getByCy('wordCard').as('fullWordCard');

      cy.checkWordCard(wordInput, '@fullWordCard', 'full');
    });
  });
});
