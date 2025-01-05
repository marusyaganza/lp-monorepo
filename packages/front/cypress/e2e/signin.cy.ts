/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

import { Language } from '../../src/generated/graphql';
import { HEADER_TEXTS, TEXTS_BY_PAGE, USER_CREDS } from '../support/constants';
import { tags } from '../support/mocks/tags';

describe('sign in page', () => {
  beforeEach(() => {
    cy.task('prepareDB', {
      tags: [...tags[Language.English], ...tags[Language.Spanish]]
    });
    cy.clock();
    cy.visit('/');
    cy.get('input[name="password"]').as('password');
    cy.get('input[name="email"]').as('email');
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });

  it('all elements should be visible', () => {
    cy.get('input').should('have.length', 2);
    cy.get('img').should('be.visible').should('have.attr', 'alt');
    cy.get('button[type="submit"]').should(
      'have.text',
      TEXTS_BY_PAGE.signIn.mainHeading
    );
    cy.get('a').contains(TEXTS_BY_PAGE.signIn.signUpLink).click();
    cy.get('h2').should('have.text', TEXTS_BY_PAGE.signUp.mainHeading);
    cy.get('input').should('have.length', 6);
  });

  it('should validate the form', () => {
    cy.get('form').submit();
    cy.getByCy('inputError')
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
    cy.get('@password').type(USER_CREDS.password);
    cy.get('@email').type(USER_CREDS.email);
    cy.get('button').contains('Sign in').click();
    cy.get('h1').should('have.text', TEXTS_BY_PAGE.home.mainHeading);
    cy.get('header').should('exist');
    cy.get('footer').should('exist');
  });

  it('should not login with incorrect password', () => {
    cy.visit('/');
    cy.get('@password').type('12Password4!');
    cy.get('@email').type(USER_CREDS.email);
    cy.get('button').contains('Sign in').click();
    cy.getByCy('notification-error')
      .as('notificationError')
      .find('h3')
      .should('have.text', 'Error');

    cy.get('@notificationError').contains('email or password is incorrect');
    cy.get('h2').should('have.text', TEXTS_BY_PAGE.signIn.mainHeading);
    cy.checkPathName('/sign-in');
  });

  it('should not login with incorrect email', () => {
    cy.visit('/');
    cy.get('@password').type(USER_CREDS.password);
    cy.get('@email').type('test2@test.com');
    cy.get('button').contains('Sign in').click();
    cy.getByCy('notification-error')
      .as('notificationError')
      .find('h3')
      .should('have.text', 'Error');

    cy.get('@notificationError').contains('email or password is incorrect');
    cy.get('h2').should('have.text', TEXTS_BY_PAGE.signIn.mainHeading);
    cy.checkPathName('/sign-in');
  });

  it('should redirect the user the correct page after login', () => {
    cy.visit('/words');
    cy.checkPathName('/sign-in');
    cy.get('@password').type(USER_CREDS.password);
    cy.get('@email').type(`${USER_CREDS.email}{Enter}`);
    cy.checkPathName('/words');
  });

  it('should logout user automatically after 7 days and should not lose parameters', () => {
    cy.login();
    cy.getByCy('headerNav').contains(HEADER_TEXTS.vocabulary).click();
    cy.get('h1').should('have.text', TEXTS_BY_PAGE.vocabulary.mainHeading);

    cy.getByCy('sortControls').as('sortControls');
    cy.findByCy('select', '@sortControls').as('select');
    cy.getByCy('spinner').should('not.exist');
    cy.selectOption('@select', 'Alphabetically');

    cy.getByCy('tag-selector').as('tagSelector');
    cy.selectOption('@tagSelector', 'Tag2');
    cy.selectOption('@tagSelector', 'Tag3');

    cy.findByCy('checkbox-label', '@sortControls').as('orderCheckbox').click();
    cy.getByCy('headerNav').contains(HEADER_TEXTS.practice).click();
    cy.getByCy('sortControls').as('gameSortControls');
    cy.findByCy('select', '@gameSortControls').as('gameSelect');
    cy.getByCy('spinner').should('not.exist');
    cy.selectOption('@gameSelect', 'Errors');
    cy.findByCy('checkbox-label', '@sortControls').click();

    cy.selectOption('@tagSelector', 'Tag1');

    cy.tick(1000 * 60 * 60 * 24 * 7);
    cy.checkPathName('/sign-in');
    cy.get('h2').should('have.text', TEXTS_BY_PAGE.signIn.mainHeading);
    cy.get('@email').type(USER_CREDS.email);
    cy.get('@password').type(`${USER_CREDS.password}{Enter}`);
    cy.getByCy('spinner').should('not.exist');

    cy.findByCy('select-btn', '@select').should('have.text', 'Errors');
    cy.findByCy('checkbox-label', '@sortControls')
      .find('svg')
      .should('have.attr', 'aria-label', 'asc');

    cy.findByCy('tag', '@tagSelector').should('contain', 'Tag1');

    cy.getByCy('headerNav').contains(HEADER_TEXTS.vocabulary).click();
    cy.getByCy('spinner').should('not.exist');

    cy.findByCy('select-btn', '@select').should('have.text', 'Alphabetically');
    cy.findByCy('checkbox-label', '@sortControls')
      .find('svg')
      .should('have.attr', 'aria-label', 'asc');
    cy.findByCy('tag', '@tagSelector').as('vocabTags');
    cy.get('@vocabTags').contains('Tag2');
    cy.get('@vocabTags').contains('Tag3');
  });
});
