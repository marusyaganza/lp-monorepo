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
import {
  correctDefs,
  wordWithAltSpelling
} from '../../support/mocks/newWordInputs';

const languages = Object.values(Language);

const incorrectAnswers = {
  [Language.English]: 'quix',
  [Language.Spanish]: 'espirelar'
};

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
    const availableGames = games.filter(
      game =>
        game.type !== Game.Conjugation &&
        game.type !== Game.Gender &&
        game.type !== Game.Speaking
    );
    availableGames.forEach(game => {
      it(`should answer incorrectly a game with alt. spelling in ${lang} language`, () => {
        cy.presetLanguage(lang);
        cy.visit('/games');
        const wordInput = wordWithAltSpelling[lang];
        cy.visit('/words/new');
        cy.fillWordForm(wordInput);
        cy.getByCy('wordForm').find('button[type="submit"]').click();
        cy.checkNotification(
          'Word added',
          `${wordInput.name} is added successfully`,
          true
        );

        cy.getByCy('spinner').should('not.exist');
        cy.getByCy('wordCard').first().as('wordCard').click();
        cy.checkWordCard(
          { ...wordInput, ...correctDefs[lang] },
          '@wordCard',
          'full'
        );

        cy.get('@headerLink').contains(HEADER_TEXTS.practice).click();

        cy.getByCy('gameCard').eq(game.orderNum).click();
        cy.checkPathName(`/games/${game.id}`);
        playGameOnce(game.type, incorrectAnswers[lang]);
        const correctAnswer =
          game.type === Game.Audio || game.type === Game.TypeWord
            ? wordInput.alternativeSpelling?.join(', or')
            : undefined;
        checkGame(
          GameStage.Error,
          game.type,
          wordInput.name,
          wordInput.imgUrl,
          undefined,
          correctAnswer
        );
        cy.getByCy('continue-button').click();
        checkResultScreen(0, 1, 0);
        cy.intercept('POST', 'http://localhost:4000/graphql').as(
          'saveGameResult'
        );

        cy.getByCy('finish-game').click();
        cy.wait('@saveGameResult')
          .its('request.body')
          .should(body => {
            expect(body.operationName).to.equal('SaveGameResult');
            expect(body.variables.input[0]).to.include({
              hasError: true,
              gameType: game.type
            });
          });
      });

      it(`should answer correctly a game with main spelling in ${lang} language`, () => {
        cy.presetLanguage(lang);
        cy.visit('/games');
        const wordInput = wordWithAltSpelling[lang];
        cy.visit('/words/new');
        cy.fillWordForm(wordInput);
        cy.getByCy('wordForm').find('button[type="submit"]').click();
        cy.checkNotification(
          'Word added',
          `${wordInput.name} is added successfully`,
          true
        );

        cy.get('@headerLink').contains(HEADER_TEXTS.practice).click();
        cy.getByCy('gameCard').eq(game.orderNum).click();
        cy.checkPathName(`/games/${game.id}`);
        playGameOnce(game.type, wordInput.name);

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
