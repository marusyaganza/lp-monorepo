/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

describe('Search Page', () => {
  beforeEach(() => {
    cy.task('prepareDB');
    cy.login();
    cy.get('form').find('[data-cy="searchButton"]').as('searchButton');
    cy.get('[data-cy="headerNav"] a').as('headerLink');
    cy.clock();
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });

  it('should render all the elements correctly', () => {
    cy.get('main').find('h1').should('have.text', 'Look up word');
    cy.get('main')
      .find('a')
      .contains('Add your own word')
      .should('exist')
      .click();
    cy.location().should('have.a.property', 'pathname', '/words/new');
    cy.go(-1);
    cy.get('form').find('input').should('have.attr', 'placeholder', 'Search');
    cy.get('form').find('input').should('have.attr', 'value', '');
    cy.get('form').find('[data-cy="searchButton"]').should('be.disabled');
    cy.get('form').find('input').type('a');
    cy.get('form').find('input').should('have.attr', 'value', 'a');
    cy.get('form').find('[data-cy="searchButton"]').should('not.be.disabled');
    cy.get('form').find('[data-cy="clearButton"]').click();
    cy.get('form').find('input').should('have.attr', 'value', '');
  });

  it('should search the word and display result', () => {
    cy.get('[data-cy="spinner"]').should('not.exist');
    cy.get('form').find('input').type('a');
    cy.get('form').find('[data-cy="searchButton"]').click();
    cy.contains('Mocks are enabled. You can query words from the list:');
    cy.get('form').find('[data-cy="clearButton"]').click();
    cy.get('form').find('input').type('voluminous');
    cy.get('form').find('[data-cy="searchButton"]').click();
    cy.get('[data-cy="searchResult"]').should('exist');
    cy.get('[data-cy="searchResult"]')
      .find('[data-cy="wordCard"]')
      .should('have.length', 1);
    cy.get('[data-cy="searchResult"]')
      .find('li')
      .find('header')
      .find('h3')
      .should('have.text', 'voluminous');
    cy.get('article').contains('adjective');
    cy.get('[data-cy="defsList"] li').should('have.length', 3);
    cy.get('[data-cy="stems"]').contains('Word forms');
    cy.get('[data-cy="example"]').should('have.length', 2);
  });

  it('should search a word and add it to vocabulary', () => {
    cy.get('form').find('input').type('rubber');
    cy.get('@searchButton').click();
    cy.get('[data-cy="searchResult"]')
      .find('[data-cy="addButton"]')
      .as('addButton')
      .last()
      .click();
    cy.get('[data-cy="notification-success"]').should('be.visible');
    cy.tick(5000);
    cy.get('[data-cy="notification-success"]').should('not.exist');
    cy.get('@headerLink').contains('Vocabulary').click();
    cy.get('[data-cy="wordsList"]').find('h3').contains('rubber stamp');
    cy.go(-1);
    cy.get('[data-cy="spinner"]').should('not.exist');
    cy.location().should('have.a.property', 'search', '?search=rubber');
    cy.get('form').find('input').should('have.attr', 'value', 'rubber');
    cy.get('[data-cy="searchResult"]')
      .find('[data-cy="wordCard"]')
      .should('have.length', 10);
  });

  // TODO figure out why error notifications do not work
  it.skip('should not add existing word to vocabulary', () => {
    cy.visit('/words');
    cy.get('@headerLink').contains('Explore').click();
    cy.get('form').find('input').type('rubber');
    cy.get('@searchButton').click();
    cy.get('[data-cy="searchResult"]')
      .find('[data-cy="addButton"]')
      .as('addButton')
      .last()
      .click();
    cy.get('@headerLink').contains('Vocabulary').click();
    cy.go(-1);
    cy.get('[data-cy="spinner"]').should('not.exist');
    cy.get('[data-cy="searchResult"]')
      .find('[data-cy="addButton"]')
      .as('addButton')
      .last()
      .click();
    cy.get('[data-cy="notification-error"]').should('be.visible');
  });
});
