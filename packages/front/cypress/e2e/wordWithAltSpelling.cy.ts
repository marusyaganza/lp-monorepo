/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

import { wordWithAltSpelling } from '../support/mocks/mockData';
// import { gameFooterMessages } from '../support/mocks/pageData';

// TODO move this to the game test suite
describe.skip('Word with alternative spelling', () => {
  beforeEach(() => {
    cy.task('prepareDB');
    cy.login();
    cy.visit('/words/new');
    cy.get('[data-cy="headerNav"] a').as('headerLink');
    cy.intercept({
      method: 'GET',
      url: `${wordWithAltSpelling.audioUrl}`
    }).as('audioReq');
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });
  it('should add a word with alt spelling and use it correctly in games', () => {
    /**fill the form */
    cy.get('[data-cy="formField-name"]')
      .find('textarea')
      .type(wordWithAltSpelling.name);

    cy.get('[data-cy="formField-particle"]')
      .find('textarea')
      .type(wordWithAltSpelling.particle);

    cy.get('[data-cy="formField-defs"]')
      .find('[data-cy="defInput"]')
      .find('textarea')
      .type(wordWithAltSpelling.defs[0].def);

    cy.get('[data-cy="formField-shortDef"]')
      .find('textarea')
      .type(wordWithAltSpelling.shortDef[0]);

    cy.get('[data-cy="formField-audioUrl"]')
      .find('textarea')
      .type(wordWithAltSpelling.audioUrl);

    cy.get('[data-cy="formField-alternativeSpelling"]')
      .find('textarea')
      .type(wordWithAltSpelling.alternativeSpelling[0]);

    cy.get('[data-cy="wordForm"]').find('button[type="submit"]').click();

    /**word is displayed correctly */
    cy.location().should('have.a.property', 'pathname', '/words');

    cy.get('[data-cy="notification-success"]')
      .as('notification')
      .should('be.visible');
    cy.get('@notification').find('h3').should('have.text', 'Word added');
    cy.get('@notification').contains(
      `${wordWithAltSpelling.name} is added successfully`
    );

    cy.get('[data-cy="cardWrapper"]').click();

    cy.get('[data-cy="altSpelling"]').contains(
      `Alternative spelling: ${wordWithAltSpelling.alternativeSpelling.join(
        ', '
      )}`
    );

    /**games audio*/
    cy.visit('/games');

    cy.get('[data-cy="gamesList"]')
      .find('[data-cy="gameCard"]')
      .find('a')
      .as('gameCard')
      .first()
      .click();

    cy.get('[data-cy="gameAnswer"]').find('input').type('long-haul');

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        // expect(gameFooterMessages.success.includes(text));
      });

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .first()
      .contains('Your result: 100%');

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .eq(1)
      .contains('Learned words: 1');

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .eq(2)
      .contains('Answered correctly: 1');

    cy.get('[data-cy="gameResult"]')
      .find('button')
      .should('have.text', 'Finish')
      .and('have.focus')
      .click();

    cy.get('@gameCard').first().click();

    cy.get('[data-cy="gameAnswer"]').find('input').type('long haul');

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        // expect(gameFooterMessages.success.includes(text));
      });

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .first()
      .contains('Your result: 100%');

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .eq(1)
      .contains('Learned words: 1');

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .eq(2)
      .contains('Answered correctly: 1');

    cy.get('[data-cy="gameResult"]')
      .find('button')
      .should('have.text', 'Finish')
      .and('have.focus')
      .click();

    cy.get('@gameCard').first().click();

    cy.get('[data-cy="gameAnswer"]').find('input').type('longhaul');

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        // expect(gameFooterMessages.error.includes(text));
      });

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .first()
      .contains('Your result: 0%');

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .eq(1)
      .contains('Learned words: 1');

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .eq(2)
      .contains('Answered correctly: 0');

    cy.get('[data-cy="gameResult"]')
      .find('button')
      .should('have.text', 'Finish')
      .and('have.focus')
      .click();

    /**games type word*/

    cy.get('@gameCard').last().click();

    cy.get('[data-cy="gameAnswer"]').find('input').type('long-haul');

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        // expect(gameFooterMessages.success.includes(text));
      });

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .first()
      .contains('Your result: 100%');

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .eq(1)
      .contains('Learned words: 1');

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .eq(2)
      .contains('Answered correctly: 1');

    cy.get('[data-cy="gameResult"]')
      .find('button')
      .should('have.text', 'Finish')
      .and('have.focus')
      .click();

    cy.get('@gameCard').last().click();

    cy.get('[data-cy="gameAnswer"]').find('input').type('long haul');

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        // expect(gameFooterMessages.success.includes(text));
      });

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .first()
      .contains('Your result: 100%');

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .eq(1)
      .contains('Learned words: 1');

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .eq(2)
      .contains('Answered correctly: 1');

    cy.get('[data-cy="gameResult"]')
      .find('button')
      .should('have.text', 'Finish')
      .and('have.focus')
      .click();

    cy.get('@gameCard').last().click();

    cy.get('[data-cy="gameAnswer"]').find('input').type('longhaul');

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        // expect(gameFooterMessages.error.includes(text));
      });

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .first()
      .contains('Your result: 0%');

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .eq(1)
      .contains('Learned words: 1');

    cy.get('[data-cy="gameResult"]')
      .find('p')
      .eq(2)
      .contains('Answered correctly: 0');

    cy.get('[data-cy="gameResult"]')
      .find('button')
      .should('have.text', 'Finish')
      .and('have.focus')
      .click();
  });
});
