import { routes } from '../../../src/constants/routes';

export function addWord(query: string, name?: string) {
  cy.visit(routes.search);
  cy.getByCy('searchForm').find('input').type(query);
  cy.getByCy('searchForm').submit();
  if (name) {
    cy.getByCy(`wordcard-${name}`).first().as('wordCard');
  } else {
    cy.getByCy('wordCard').first().as('wordCard');
  }
  cy.findByCy('addButton', '@wordCard').as('add-btn').click();
  cy.get('@add-btn').should('be.disabled');
  cy.checkNotification('Word added', `${name || query} is added successfully`);
}
