/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

describe('sign up page', () => {
  beforeEach(() => {
    cy.task('prepareDB');
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });

  it('should render all the elements', () => {
    cy.visit('/');
    cy.get('a').click();
    cy.get('h2').should('have.text', 'Sign up');
    cy.contains('already have account?');
    cy.get('button').contains('Sign up').click();
    cy.get('input').should('have.length', 6);
  });

  it('should validate the form', () => {
    cy.visit('http://localhost:8080/sign-up');
    cy.get('input').should('have.length', 6);
    cy.get('form').submit();
    cy.get('[data-cy="inputError"]').should('have.length', 6).and('be.visible');
  });

  it('should create a new account', () => {
    cy.visit('http://localhost:8080/sign-up');
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="password"]').type('123Password!');
    cy.get('input[name="repeatPassword"]').type('123Password!');
    cy.get('input[name="email"]').type('test3@test.com');
    cy.get('button').contains('Sign up').click();
  });
});
