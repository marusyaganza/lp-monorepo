import { Language } from '../../../src/generated/graphql';
import { USER_CREDS } from '../constants';

export function getByCy(selector: string) {
  return cy.get(`[data-cy="${selector}"]`);
}

export function findByCy(selector: string, parentSelector: string) {
  return cy.get(parentSelector).find(`[data-cy="${selector}"]`);
}

export function checkNotification(
  heading: string,
  text: string,
  checkVisibility = false,
  kind = 'success'
) {
  cy.get(`[data-cy="notification-${kind}"]`).as('notification');

  cy.get('@notification').find('h3').should('have.text', heading);
  cy.get('@notification').contains(text);
  if (checkVisibility) {
    cy.get('@notification').should('be.visible');
  }
  return cy.get('@notification');
}

export function checkPathName(route: string) {
  cy.location().should('have.a.property', 'pathname', route);
}

export function login(
  email = USER_CREDS.email,
  password = USER_CREDS.password
) {
  cy.visit('/search');
  cy.get('input[name="password"]').type(password);
  cy.get('input[name="email"]').type(email);
  cy.get('button').contains('Sign in').click();
  cy.get('[data-cy=loginForm]').should('not.exist');
}

export function presetLanguage(lang: Language) {
  cy.window().then(win => {
    win.localStorage.setItem('language', JSON.stringify(lang));
  });
}

export function selectOption(selector: string, option: string) {
  cy.getByCy('spinner').should('not.exist');
  cy.findByCy('select-btn', selector).click({ force: true });
  cy.findByCy('selectOptions', selector).as('options').contains(option).click();
  cy.get('@options').should('not.exist');
}

export function changeLanguage(
  lang: Language,
  currentLanguage = Language.English
) {
  if (lang === currentLanguage) {
    return;
  }
  cy.getByCy('language-selector').as('langSelector');
  cy.selectOption('@langSelector', lang.toLowerCase());
  cy.getByCy('current-language').contains(lang);
}

export function checkReq(reqSelector: string) {
  cy.wait(reqSelector).then(interception => {
    assert.isNotNull(interception?.response?.body, 'network call');
  });
}
