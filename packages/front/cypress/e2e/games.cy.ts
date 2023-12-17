/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />
import { games } from '../support/mocks/games';
describe('Words Page', () => {
  beforeEach(() => {
    cy.task('prepareDB');
    cy.login();
    cy.visit('/games');
    cy.get('[data-cy="sortControls"]').as('sortControls');
    cy.get('@sortControls').find('[data-cy="select"]').as('select');
    cy.get('[data-cy="headerNav"] a').as('headerLink');
    cy.get('[data-cy="gamesList"]').as('gamesList');
    cy.get('@gamesList').find('[data-cy="gameCard"]').as('gameCard');
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });

  it('should render all the elements correctly', () => {
    cy.get('h1').should('have.text', 'Select a training');
    cy.get('@select').contains('Select words by');
    cy.get('@gameCard').should('have.length', 4);
  });

  games.forEach((game, i) => {
    it(`${game.id} game card should be rendered correctly`, () => {
      cy.get('@gameCard')
        .eq(i)
        .find('h2')
        .first()
        .should('have.text', game.name);
      cy.get('@gameCard').eq(i).contains(game.desc);
      cy.get('@gameCard')
        .eq(i)
        .find('a')
        .should('have.attr', 'href', `/games/${game.id}?isReverseOrder=false`);
    });
  });
});
