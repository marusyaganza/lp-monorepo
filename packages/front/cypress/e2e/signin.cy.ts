/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

describe('sign in page', () => {
  beforeEach(() => {
    cy.task('prepareDB');
    cy.clock();
    cy.visit('/');
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });
  it('all elements are visible', () => {
    cy.get('input').should('have.length', 2);
    cy.get('img').should('be.visible').should('have.attr', 'alt');
    cy.get('a').should('have.text', 'Sign up');
    cy.get('button[type="submit"]').should('have.text', 'Sign in');
    cy.get('a').click();
    cy.get('h2').should('have.text', 'Sign up');
    cy.get('input').should('have.length', 6);
  });

  it('should validate the form', () => {
    cy.get('form').submit();
    cy.get('[data-cy="inputError"]')
      .as('error')
      .first()
      .should('have.text', 'email is required')
      .and('be.visible');

    cy.get('@error')
      .last()
      .should('have.text', 'password is required')
      .and('be.visible');
  });

  it('should login with correct password', () => {
    cy.get('input[name="password"]').type('123Password!');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('button').contains('Sign in').click();
    cy.get('h1').should('have.text', 'The Power of Learning Languages');
    cy.get('header').should('exist');
    cy.get('footer').should('exist');
  });

  // TODO figure out why error notifications do not work
  it.skip('should not login with incorrect password', () => {
    cy.visit('/');
    cy.get('input[name="password"]').type('12Password4!');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('button').contains('Sign in').click();
    cy.get('[data-cy="notification-error"]')
      .should('be.visible')
      .find('h3')
      .should('have.text', 'Error');

    cy.get('[data-cy="notification-error"]').contains(
      'email or password is incorrect'
    );
    cy.get('h2').should('have.text', 'Sign in');
  });

  // TODO figure out why error notifications do not work
  it.skip('should not login with incorrect email', () => {
    cy.visit('/');
    cy.get('input[name="password"]').type('123Password4!');
    cy.get('input[name="email"]').type('test2@test.com');
    cy.get('button').contains('Sign in').click();
    cy.get('[data-cy="notification-error"]')
      .should('be.visible')
      .find('h3')
      .should('have.text', 'Error');

    cy.get('[data-cy="notification-error"]').contains(
      'email or password is incorrect'
    );
    cy.get('h2').should('have.text', 'Sign in');
  });

  it('should redirect the user the correct page after login', () => {
    cy.visit('/words');
    cy.location().should('have.a.property', 'pathname', '/sign-in');
    cy.get('input[name="password"]').type('123Password!');
    cy.get('input[name="email"]').type('test@test.com{Enter}');
    cy.location().should('have.a.property', 'pathname', '/words');
  });

  it('should logout user automatically after 2 days and should not lose parameters', () => {
    cy.login();
    cy.get('[data-cy="headerNav"] a').contains('Vocabulary').click();
    cy.get('h1').should('have.text', 'Vocabulary');

    cy.get('[data-cy="sortControls"]').as('sortControls');
    cy.get('@sortControls').find('[data-cy="select"]').as('select');
    cy.get('[data-cy="spinner"]').should('not.exist');
    cy.get('@select').find('button').focus().click({ force: true });
    cy.get('[data-cy="selectOption"]').contains('Alphabetically').click();
    cy.get('@sortControls').find('[data-cy="checkbox"]').click();
    cy.get('[data-cy="headerNav"] a').contains('Practice').click();

    cy.get('[data-cy="sortControls"]').as('sortControls');
    cy.get('@sortControls').find('[data-cy="select"]').as('select');
    cy.get('[data-cy="spinner"]').should('not.exist');
    cy.get('@select').find('button').focus().click({ force: true });
    cy.get('[data-cy="selectOption"]').contains('Errors').click();
    cy.get('@sortControls').find('[data-cy="checkbox"]').click();

    cy.tick(1000 * 60 * 60 * 24 * 7);
    cy.location().should('have.a.property', 'pathname', '/sign-in');
    cy.get('h2').should('have.text', 'Sign in');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('123Password!{Enter}');

    cy.get('@select').find('button').should('have.text', 'Errors');
    cy.get('@sortControls')
      .find('[data-cy="checkbox"]')
      .find('svg')
      .should('have.attr', 'aria-label', 'asc');

    cy.get('[data-cy="headerNav"] a').contains('Vocabulary').click();
    cy.get('@select').find('button').should('have.text', 'Alphabetically');
    cy.get('@sortControls')
      .find('[data-cy="checkbox"]')
      .find('svg')
      .should('have.attr', 'aria-label', 'asc');
  });
});
