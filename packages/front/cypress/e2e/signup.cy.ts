/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

import { Language } from '../../src/generated/graphql';
import { HEADER_TEXTS, TEXTS_BY_PAGE, USER_CREDS } from '../support/constants';

const newUserInput = {
  email: 'test3@test.com',
  firstName: 'John',
  lastName: 'Doe',
  password: '123Password!!',
  repeatPassword: '123Password!!'
};

describe('sign up page', () => {
  beforeEach(() => {
    cy.task('prepareDB');
    cy.visit('/sign-up');
    cy.getByCy('sign-up-heading').as('pageHeading');
    cy.get('button').contains('Sign up').as('submitBtn');
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });

  it('should render all the elements', () => {
    cy.get('a').contains(TEXTS_BY_PAGE.signUp.signInLink).click();
    cy.getByCy('login-heading').should(
      'have.text',
      TEXTS_BY_PAGE.signIn.mainHeading
    );
    cy.contains('No account?');
    cy.get('a').contains(TEXTS_BY_PAGE.signIn.signUpLink).click();
    cy.get('input').should('have.length', 6);
  });

  it('should validate the form', () => {
    cy.visit('/sign-up');
    cy.get('input').should('have.length', 6);
    cy.get('form').submit();
    cy.getByCy('inputError').should('have.length', 6).and('be.visible');
  });

  it('should create a new account', () => {
    cy.visit('/sign-up');
    const fields = Object.keys(newUserInput);
    fields.forEach(field => {
      cy.get(`input[name="${field}"]`).type(newUserInput[field]);
    });
    cy.get('@submitBtn').click();
    cy.get('h1').should('have.text', TEXTS_BY_PAGE.home.mainHeading);
    cy.get('header').should('exist');
    cy.get('footer').should('exist');
  });

  it('should not be able create a new account if email is already taken', () => {
    cy.visit('/sign-up');
    const userInput = { ...newUserInput, email: USER_CREDS.email };
    const fields = Object.keys(userInput);
    fields.forEach(field => {
      cy.get(`input[name="${field}"]`).type(userInput[field]);
    });
    cy.get('@submitBtn').click();

    cy.getByCy('notification-error')
      .as('notificationError')
      .find('h3')
      .should('have.text', 'Error');

    cy.get('@notificationError').contains(
      `user with email ${USER_CREDS.email} already exists`
    );
    cy.get('@pageHeading').should(
      'have.text',
      TEXTS_BY_PAGE.signUp.mainHeading
    );
    cy.checkPathName('/sign-up');
  });

  it('should not be able create a new account if passwords do not match', () => {
    cy.visit('/sign-up');
    const userInput = { ...newUserInput, password: '123Password!!!' };
    const fields = Object.keys(userInput);
    fields.forEach(field => {
      cy.get(`input[name="${field}"]`).type(userInput[field]);
    });
    cy.get('@submitBtn').as('signUpBtn').click();
    cy.getByCy('inputError').contains("passwords don't match");
    cy.get('@pageHeading').should(
      'have.text',
      TEXTS_BY_PAGE.signUp.mainHeading
    );
    cy.checkPathName('/sign-up');

    cy.get('input[name="repeatPassword"]').clear().type(userInput.password);
    cy.get('@signUpBtn').click();
    cy.get('h1').should('have.text', TEXTS_BY_PAGE.home.mainHeading);
    cy.checkPathName('/');
  });

  it('should not be able create a new account with a weak password', () => {
    cy.visit('/sign-up');
    const weakPassword = '123pass';
    const userInput = {
      ...newUserInput,
      password: weakPassword,
      repeatPassword: weakPassword
    };
    const fields = Object.keys(userInput);
    fields.forEach(field => {
      cy.get(`input[name="${field}"]`).type(userInput[field]);
    });
    cy.get('@submitBtn').as('signUpBtn').click();
    cy.getByCy('inputError')
      .contains("passwords don't match")
      .should('be.visible');

    cy.getByCy('inputError')
      .contains('password is required')
      .should('be.visible');

    cy.get('@pageHeading').should(
      'have.text',
      TEXTS_BY_PAGE.signUp.mainHeading
    );
    cy.checkPathName('/sign-up');

    cy.get('input[name="repeatPassword"]').clear().type(newUserInput.password);
    cy.get('input[name="password"]').clear().type(newUserInput.password);

    cy.get('@signUpBtn').click();
    cy.get('h1').should('have.text', TEXTS_BY_PAGE.home.mainHeading);
    cy.checkPathName('/');
  });

  it('should clear all the data when user logs out', () => {
    cy.visit('/sign-up');
    const fields = Object.keys(newUserInput);
    fields.forEach(field => {
      cy.get(`input[name="${field}"]`).type(newUserInput[field]);
    });

    cy.get('@submitBtn').click();
    cy.checkPathName('/');

    cy.getByCy('headerNav').contains(HEADER_TEXTS.explore).click();
    cy.addWord('voluminous');
    cy.getByCy('headerNav').contains(HEADER_TEXTS.vocabulary).click();
    cy.getByCy('words-count').should('contain', 'You have 1 words');
    cy.getByCy('wordCard').should('have.length', 1);

    cy.getByCy('sortControls').as('sortControls');
    cy.findByCy('select', '@sortControls').as('select');
    cy.getByCy('spinner').should('not.exist');
    cy.selectOption('@select', 'Word Category');

    cy.getByCy('tag-selector').should('not.exist');

    cy.findByCy('checkbox-label', '@sortControls').as('orderCheckbox').click();

    cy.getByCy('headerNav').contains(HEADER_TEXTS.practice).click();
    cy.getByCy('spinner').should('not.exist');

    cy.changeLanguage(Language.Spanish);

    cy.getByCy('user-menu').click();
    cy.getByCy('user-menu-items').contains('Logout').click();
    cy.checkPathName('/sign-in');

    cy.login();
    cy.getByCy('headerNav').contains(HEADER_TEXTS.vocabulary).click();
    cy.getByCy('words-count').should('contain', 'You have 0 words');
    cy.getByCy('spinner').should('not.exist');
    cy.getByCy('wordCard').should('not.exist');

    cy.findByCy('select-btn', '@select').should('have.text', 'Date');
    cy.findByCy('checkbox-label', '@sortControls')
      .find('svg')
      .should('have.attr', 'aria-label', 'desc');

    cy.getByCy('headerNav').contains(HEADER_TEXTS.practice).click();
    cy.getByCy('spinner').should('not.exist');
    cy.getByCy('current-language').contains(Language.English);
  });
});
