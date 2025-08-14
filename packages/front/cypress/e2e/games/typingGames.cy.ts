/* eslint-disable jest/valid-expect */
/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

import { Game, Language } from '../../../src/generated/graphql';
import { GameStage, HEADER_TEXTS } from '../../support/constants';
import { games } from '../../support/mocks/games';
import {
  checkGame,
  checkResultScreen,
  playGameOnce
} from '../../support/helpers/game';
import { wordWithAltSpelling } from '../../support/mocks/newWordInputs';

const languages = Object.values(Language);

const typingGames = games.filter(
  game =>
    game.type === Game.Audio ||
    game.type === Game.TypeWord ||
    game.type === Game.Image
);

describe('Game Page', () => {
  beforeEach(() => {
    cy.task('prepareDB');
    cy.login();
    cy.visit('/games');
    cy.get('[data-cy="headerNav"] a').as('headerLink');
    cy.get('[data-cy="gamesList"]').as('gamesList');
    cy.get('@gamesList').find('[data-cy="gameCard"]').as('gameCard');
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });

  languages.forEach(lang => {
    typingGames.forEach(game => {
      it(`should answer correctly ${game.id} game with alt. spelling in ${lang} language`, () => {
        cy.presetLanguage(lang);
        cy.visit('/games');
        const wordInput = wordWithAltSpelling[lang];
        cy.visit('/words/new');
        cy.fillWordForm(wordInput);
        cy.getByCy('wordForm').find('button[type="submit"]').click();

        cy.get('@headerLink').contains(HEADER_TEXTS.practice).click();
        cy.getByCy('gameCard').eq(game.orderNum).click();
        cy.checkPathName(`/games/${game.id}`);
        playGameOnce(game.type, wordInput.alternativeSpelling[0]);

        checkGame(
          GameStage.Success,
          game.type,
          wordInput.name,
          wordInput.imgUrl
        );
        cy.getByCy('continue-button').click();
        checkResultScreen(100, 1, 1);
        cy.intercept('POST', 'http://localhost:4000/graphql').as(
          'saveGameResult'
        );

        cy.getByCy('finish-game').click();
        cy.wait('@saveGameResult')
          .its('request.body')
          .should(body => {
            expect(body.operationName).to.equal('SaveGameResult');
            expect(body.variables.input[0]).to.include({
              hasError: false,
              gameType: game.type
            });
          });
      });
    });
  });
});
