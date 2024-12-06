/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

import { Language } from '../../src/generated/graphql';
import { HEADER_TEXTS, TEXTS_BY_PAGE } from '../support/constants';
import { simpleSearchResult } from '../support/mocks/searchResult';

const languages = Object.values(Language);

const simpleSearch = {
  [Language.English]: 'voluminous',
  [Language.Spanish]: 'hola'
};

const longSearch = {
  [Language.English]: 'heart',
  [Language.Spanish]: 'ser'
};

describe('Search Page', () => {
  beforeEach(() => {
    cy.task('prepareDB');
    cy.login();
    cy.visit('/search');
    cy.getByCy('headerNav').as('headerLink');
    cy.get('form').find('input').as('searchInput');
    languages.forEach(lang => {
      cy.intercept({
        method: 'GET',
        url: `${simpleSearchResult[lang].audioUrl}`
      }).as(`audioReq-${lang}`);
    });
    cy.clock();
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });
  languages.forEach(lang => {
    it(`should render all the elements correctly with ${lang}`, () => {
      cy.changeLanguage(lang);
      cy.getByCy('page-content')
        .find('h1')
        .should('have.text', TEXTS_BY_PAGE.search.mainHeading);
      cy.getByCy('add-word-link')
        .contains(TEXTS_BY_PAGE.search.addWordLink)
        .should('exist')
        .click();
      cy.location().should('have.a.property', 'pathname', '/words/new');
      cy.go(-1);
      cy.get('@searchInput').should('have.attr', 'placeholder', 'Search');
      cy.get('@searchInput').should('be.empty');
      cy.findByCy('searchButton', 'form').should('be.disabled');
      cy.get('@searchInput').type('a');
      cy.get('@searchInput').should('have.attr', 'value', 'a');
      cy.findByCy('searchButton', 'form').should('not.be.disabled');
      cy.findByCy('clearButton', 'form').click();
      cy.get('@searchInput').should('be.empty');
    });

    it(`should search the word in ${lang} and display result`, () => {
      cy.changeLanguage(lang);
      const query = simpleSearch[lang];
      cy.get('@searchInput').type(`${query}{Enter}`);
      cy.getByCy('wordCard').as('wordCard');
      cy.getByCy('audioButton').click();
      cy.checkReq(`@audioReq-${lang}`);
      cy.checkWordCard(simpleSearchResult[lang], '@wordCard', 'full');
      cy.findByCy('addButton', '@wordCard').as('add-btn').should('be.enabled');
      cy.location().should('have.a.property', 'search', `?search=${query}`);
    });

    it(`should search a word in ${lang} and add it to vocabulary`, () => {
      cy.changeLanguage(lang);
      const query = simpleSearch[lang];
      cy.get('@searchInput').type(`${query}{Enter}`);
      cy.getByCy('wordCard').as('wordCard');
      cy.findByCy('addButton', '@wordCard').click();
      cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
      cy.getByCy('wordCard').as('wordCard');
      cy.checkWordCard(simpleSearchResult[lang], '@wordCard');
      cy.get('@wordCard').click();
      cy.checkWordCard(simpleSearchResult[lang], '@wordCard', 'full');
    });

    it(`should search a word in ${lang} and display multiple results`, () => {
      cy.changeLanguage(lang);
      const query = longSearch[lang];
      cy.get('@searchInput').type(`${query}{Enter}`);
      cy.getByCy('wordCard').should('have.length', 10);
    });

    it(`should not add existing ${lang} word to vocabulary`, () => {
      cy.changeLanguage(lang);
      const query = longSearch[lang];
      cy.get('@searchInput').type(`${query}{Enter}`);
      cy.getByCy('wordCard').as('wordCard');
      cy.findByCy('addButton', '@wordCard').first().as('add-btn').click();
      cy.get('@add-btn').should('be.disabled');
      cy.findByCy('addButton', '@wordCard').eq(1).as('add-btn').click();
      cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
      cy.getByCy('wordCard').should('have.length', 2);
      cy.get('@headerLink').contains(HEADER_TEXTS.explore).click();
      cy.get('@searchInput').should('be.empty');
      cy.get('@searchInput').type(`${query}{Enter}`);
      cy.findByCy('addButton', '@wordCard').first().click();
      cy.getByCy('notification-error').contains('is already added');
    });

    it(`should display existing search correctly with the word in ${lang}`, () => {
      cy.changeLanguage(lang);
      const query = simpleSearch[lang];
      cy.visit(`/search?search=${query}`);
      cy.getByCy('wordCard').as('wordCard');
      cy.checkWordCard(simpleSearchResult[lang], '@wordCard', 'full');
      cy.get('@searchInput').should('have.value', query);
    });
  });

  it('should display clickable suggestions correctly', () => {
    const query = simpleSearch[Language.English];
    cy.get('@searchInput').type('suggestions');
    cy.findByCy('searchButton', 'form').click();
    cy.getByCy('clickable-suggestion').contains(query).click();
    cy.location().should('have.a.property', 'search', `?search=${query}`);
    cy.getByCy('wordCard').as('wordCard');
    cy.checkWordCard(simpleSearchResult[Language.English], '@wordCard', 'full');
  });

  it('should display empty search result correctly', () => {
    cy.get('@searchInput').type('notFound{Enter}');
    cy.getByCy('empty-search-result').should(
      'have.text',
      'notFound is not found'
    );
    cy.getByCy('wordCard').should('not.exist');
  });
});
