/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

import { Language } from '../../src/generated/graphql';
import { HEADER_TEXTS, TEXTS_BY_PAGE } from '../support/constants';
import { tags } from '../support/mocks/tags';

// should keep selected tags filters if page reloads

const languages = Object.values(Language);
const tagsOptions = {
  [Language.English]: ['Tag1', 'Tag2', 'Tag3', 'without tags'],
  [Language.Spanish]: ['Etiqueta1', 'Etiqueta2', 'Etiqueta3', 'without tags']
};

const words = {
  [Language.English]: ['voluminous', 'wheel'],
  [Language.Spanish]: ['hola', 'idioma']
};

const paginatedWords = {
  [Language.English]: [
    'voluminous',
    'wheel',
    'pussy',
    'murther',
    'heart',
    'fowl'
  ],
  [Language.Spanish]: ['hola', 'idioma', 'ser', 'tener', 'ballena', 'empezar']
};

const sortWordsOptions = ['Date', 'Alphabetically', 'Word Category'];

describe('Words Page', () => {
  beforeEach(() => {
    cy.task('prepareDB', {
      tags: [...tags[Language.English], ...tags[Language.Spanish]]
    });
    cy.login();
    cy.visit('/words');
    cy.getByCy('sortControls').as('sortControls');
    cy.get('@sortControls').find('[data-cy="select"]').as('select');
    cy.getByCy('headerNav').as('headerLink');
    cy.getByCy('searchForm').find('input').as('searchInput');
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });

  languages.forEach(lang => {
    it(`should render all the elements correctly with ${lang} language`, () => {
      cy.presetLanguage(lang);
      cy.visit('/words');
      cy.get('main')
        .find('h1')
        .should('have.text', TEXTS_BY_PAGE.vocabulary.mainHeading);
      cy.get('@sortControls').find('label').contains('Sort words by');
      cy.findByCy('select-btn', '@select').contains('Date');
      cy.getByCy('words-count').should('contain', 'You have 0 words');
      cy.getByCy('add-word-link')
        .contains(TEXTS_BY_PAGE.vocabulary.addWordLink)
        .should('exist')
        .click();
      cy.location().should('have.a.property', 'pathname', '/words/new');
      cy.go(-1);
      cy.get('@searchInput').should('be.empty');
      cy.getByCy('searchButton').should('be.enabled');
      cy.getByCy('clearButton').should('be.disabled');
      cy.get('@searchInput').type('q');
      cy.getByCy('clearButton').click();
      cy.get('@searchInput').should('be.empty');

      cy.getByCy('wordCard').should('not.exist');
      cy.getByCy('tag-selector').as('tagSelector');
      cy.findByCy('select-btn', '@tagSelector').click();
      cy.findByCy('selectOptions', '@tagSelector').as('tagOptions');
      tagsOptions[lang].forEach((tag, i) => {
        cy.get('@tagOptions').find('li').eq(i).should('contain', tag);
      });
      cy.findByCy('select-btn', '@select').click();
      cy.findByCy('selectOptions', '@select').as('sortingOptions');
      sortWordsOptions.forEach((opt, i) => {
        cy.get('@sortingOptions').find('li').eq(i).should('contain', opt);
      });
    });

    it(`should display multiple words in ${lang} correctly`, () => {
      cy.presetLanguage(lang);
      words[lang].forEach(word => {
        cy.addWord(word);
      });
      cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
      cy.getByCy('words-count').should('contain', 'You have 2 words');
      cy.getByCy('wordCard').should('have.length', 2);
      cy.getByCy('pagination').should('not.exist');
      const wordToSearch = words[lang][0];
      cy.get('@searchInput').type(`${wordToSearch}{Enter}`);
      cy.getByCy('wordCard').as('foundWord').should('have.length', 1);
      cy.findByCy('name', '@foundWord').should('contain', wordToSearch);
      cy.get('@searchInput').clear();
      cy.getByCy('searchButton').click();
      cy.getByCy('wordCard').should('have.length', 2);
    });

    it(`should paginate words in ${lang} correctly`, () => {
      cy.presetLanguage(lang);
      paginatedWords[lang].forEach(word => {
        cy.addWord(word);
      });
      cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
      cy.getByCy('words-count').should('contain', 'You have 6 words');
      cy.getByCy('wordCard').should('have.length', 5);
      cy.getByCy('pagination').as('pagination');
      cy.findByCy('prev-btn', '@pagination')
        .should('contain', 'Previous')
        .should('be.disabled');
      cy.findByCy('next-btn', '@pagination')
        .should('contain', 'Next')
        .should('be.enabled')
        .click();
      cy.getByCy('wordCard').should('have.length', 1);
      cy.findByCy('next-btn', '@pagination').should('be.disabled');
      cy.findByCy('prev-btn', '@pagination').should('be.enabled').click();
      cy.getByCy('wordCard').should('have.length', 5);
    });

    it(`should delete a word in ${lang} correctly`, () => {
      cy.presetLanguage(lang);
      paginatedWords[lang].forEach(word => {
        cy.addWord(word);
      });
      cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
      cy.getByCy('words-count').should('contain', 'You have 6 words');
      cy.getByCy('wordCard').should('have.length', 5);
      cy.getByCy('pagination').find('button').should('have.length', 2);
      const wordToDelete = paginatedWords[lang][1];
      cy.getByCy(`wordcard-${wordToDelete}`).as('wordCard').should('exist');
      cy.findByCy('deleteButton', '@wordCard').click();
      cy.getByCy('@wordCard').should('not.exist');
      cy.getByCy('wordCard').should('have.length', 5);
      cy.getByCy('words-count').should('contain', 'You have 5 words');
      cy.getByCy('pagination').should('not.exist');
    });

    it(`should render words with tags in ${lang} correctly`, () => {
      cy.presetLanguage(lang);
      paginatedWords[lang].forEach(word => {
        cy.addWord(word);
      });
      cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
      const tag1 = tagsOptions[lang][0];
      const tag2 = tagsOptions[lang][1];
      const wordWithTag1 = paginatedWords[lang][1];
      const wordWithTag2 = paginatedWords[lang][3];
      const wordWith2Tags = paginatedWords[lang][0];

      cy.getByCy(`wordcard-${wordWithTag1}`).click();
      cy.getByCy('editButton').click();
      cy.editWord({ tags: [tag1] });
      cy.getByCy('wordForm').submit();

      cy.getByCy(`wordcard-${wordWithTag2}`).click();
      cy.getByCy('editButton').click();
      cy.editWord({ tags: [tag2] });
      cy.getByCy('wordForm').submit();

      cy.getByCy('next-btn').click();
      cy.getByCy('wordCard').click();
      cy.getByCy('editButton').click();
      cy.editWord({ tags: [tag1, tag2] });
      cy.getByCy('wordForm').submit();

      cy.getByCy('tag-selector').as('tagSelector');
      cy.selectOption('@tagSelector', tag1);
      cy.getByCy('wordCard').should('have.length', 2);
      cy.getByCy('name').contains(wordWithTag1);
      cy.getByCy('name').contains(wordWith2Tags);

      cy.selectOption('@tagSelector', tag2);
      cy.getByCy('wordCard').should('have.length', 1);
      cy.getByCy('name').should('contain', wordWith2Tags);

      cy.findByCy('tag', '@tagSelector').contains(tag1).find('button').click();
      cy.getByCy('wordCard').should('have.length', 2);
      cy.getByCy('name').contains(wordWithTag2);
      cy.getByCy('name').contains(wordWith2Tags);
    });
  });
});
