/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />
import { Language } from '../../src/generated/graphql';
import { games } from '../support/mocks/games';

const languages = Object.values(Language);

describe('Games Page', () => {
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
    cy.get('@gameCard').should('have.length', 6);
  });

  it('should handle language change correctly', () => {
    cy.get('@gameCard').should('have.length', 6);
    cy.changeLanguage(Language.Spanish);
    cy.get('@gameCard').should('have.length', 8);
    cy.changeLanguage(Language.English, Language.Spanish);
    cy.get('@gameCard').should('have.length', 6);
  });

  languages.forEach(lang => {
    const availableGames = games.filter(game => game.languages.includes(lang));
    availableGames.forEach((game, i) => {
      it(`${game.id} game card should be rendered correctly if ${lang} language is selected`, () => {
        cy.changeLanguage(lang);

        cy.get('@gameCard')
          .eq(i)
          .as('currentCard')
          .find('h2')
          .first()
          .should('have.text', game.name);
        cy.get('@currentCard').contains(game.desc);
        cy.get('@currentCard')
          .find('a')
          .should('have.attr', 'href', `/games/${game.id}`);
      });
    });
  });
});
