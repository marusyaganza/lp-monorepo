import { routes } from '../../../src/constants/routes';

export function addWord(query: string, name?: string) {
  cy.intercept('POST', '**/graphql', req => {
    if (req.body?.operationName === 'SearchWords') {
      req.alias = 'searchWords';
    }
  });
  cy.visit(routes.search);
  cy.getByCy('searchForm').find('input').type(query);
  cy.getByCy('searchForm').submit();
  // search can take longer than the default 4s command timeout
  cy.wait('@searchWords');
  if (name) {
    cy.getByCy(`wordcard-${name}`).first().as('wordCard');
  } else {
    cy.getByCy('wordCard').first().as('wordCard');
  }
  cy.findByCy('addButton', '@wordCard').as('add-btn').click();
  cy.get('@add-btn').should('be.disabled');
}
