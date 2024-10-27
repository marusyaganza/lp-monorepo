/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

describe('Words Page', () => {
  beforeEach(() => {
    cy.task('prepareDB');
    cy.login();
    cy.visit('/words');
    cy.get('[data-cy="sortControls"]').as('sortControls');
    cy.get('@sortControls').find('[data-cy="select"]').as('select');
    cy.get('[data-cy="headerNav"] a').as('headerLink');
    cy.get('[data-cy="wordsCount"]').as('count');
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });

  it('should render all the elements correctly', () => {
    cy.get('main').find('h1').should('have.text', 'Vocabulary');
    cy.get('@sortControls').contains('Sort words by');
    cy.get('@select').contains('Date');
    cy.get('@count').contains('0 words');
    cy.get('@count').find('a').contains('Add new').click();
    cy.get('[data-cy="backLink"]').click();
    cy.get('@headerLink').contains('Explore').click();
    cy.get('[data-cy="searchForm"]').find('input').type('egalitarian');
    cy.get('[data-cy="searchForm"]').submit();
    cy.get('[data-cy="addButton"]').click();
    cy.get('@headerLink').contains('Vocabulary').click();
    cy.get('@count').contains('1 words');
    cy.get('[data-cy="wordsList"]')
      .find('[data-cy="wordCard"]')
      .should('have.length', 1);
    cy.get('[data-cy="wordCard"]')
      .as('wordCard')
      .find('h3')
      .should('have.text', 'egalitarian');
    cy.get('[data-cy="deleteButton"]').should('be.enabled');
    cy.get('[data-cy="defsList"] li').should('have.length', 1);
    cy.get('[data-cy="cardWrapper"]').click();
    cy.get('[data-cy="deleteButton"]').should('not.exist');
    cy.get('[data-cy="editButton"]').should('be.enabled').click();
    cy.get('h1').contains('Edit word');
    cy.get('[data-cy="backLink"]').contains('Back to vocabulary').click();
    cy.get('[data-cy="deleteButton"]').click();
    cy.get('[data-cy="notification-success"]')
      .as('notification')
      .should('be.visible');
    cy.get('@notification').find('h3').should('have.text', 'Word deleted');
    cy.get('@notification').find('button').click();
    cy.get('@notification').should('not.exist');
    cy.get('[data-cy="defsList"] li').should('not.exist');
    cy.get('@count').contains('0 words');
  });

  it('should sort words correctly', () => {
    cy.get('[data-cy="wordCard"]').should('not.exist');
    cy.get('@headerLink').contains('Explore').click();

    cy.get('[data-cy="searchForm"]').find('input').type('voluminous');
    cy.get('[data-cy="searchForm"]').submit();
    cy.get('[data-cy="addButton"]').first().click();

    cy.get('form').find('[data-cy="clearButton"]').click();

    cy.get('[data-cy="searchForm"]').find('input').type('fowl');
    cy.get('[data-cy="searchForm"]').submit();
    cy.get('[data-cy="addButton"]').last().click();
    cy.get('[data-cy="addButton"]').first().click();

    cy.get('@headerLink').contains('Vocabulary').click();
    cy.get('[data-cy="wordCard"]').as('wordCard').should('have.length', 3);

    cy.get('@wordCard').first().find('h3').should('have.text', 'fowl');
    cy.get('@select').find('button').first().focus().click({ force: true });
    cy.get('[data-cy="selectOption"]').should('have.length', 4);
    cy.get('[data-cy="selectOption"]').contains('Alphabetically').click();
    cy.get('@wordCard').first().find('h3').should('have.text', 'fish');

    cy.get('@select').find('button').first().focus().click({ force: true });
    cy.get('[data-cy="selectOption"]').contains('Particle').click();
    cy.get('@wordCard').first().find('h3').should('have.text', 'voluminous');

    cy.get('@sortControls').find('[data-cy="checkbox"]').click();
    cy.get('@wordCard').last().find('h3').should('have.text', 'voluminous');
    cy.get('@sortControls').find('[data-cy="checkbox"]').click();

    cy.get('@select').find('button').first().focus().click({ force: true });
    cy.get('[data-cy="selectOption"]').contains('Date').click();
    cy.get('@wordCard').first().find('h3').should('have.text', 'fowl');

    cy.get('[data-cy="cardWrapper"]').eq(1).click();
    cy.get('[data-cy="editButton"]').click();
    cy.get('form').submit();
    cy.get('@wordCard').first().find('h3').should('have.text', 'fish');

    cy.get('[data-cy="cardWrapper"]').eq(1).click();
    cy.get('[data-cy="editButton"]').click();
    cy.get('form').submit();
    cy.get('@wordCard').first().find('h3').should('have.text', 'fish');

    cy.get('@select').find('button').first().focus().click({ force: true });

    cy.get('@wordCard').first().find('h3').should('have.text', 'fowl');
    cy.get('@wordCard').eq(1).find('h3').should('have.text', 'fish');
    cy.get('@wordCard').last().find('h3').should('have.text', 'voluminous');

    //TODO fix this functionality
    // cy.get('@sortControls').find('[data-cy="checkbox"]').click();
    // cy.get('@wordCard').last().find('h3').should('have.text', 'voluminous');
    // cy.get('@wordCard').eq(1).find('h3').should('have.text', 'fish');
    // cy.get('@wordCard').first().find('h3').should('have.text', 'fowl');
    // cy.get('@sortControls').find('[data-cy="checkbox"]').click();
  });
});
