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

const imgUrls = {
  wheel: 'https://merriam-webster.com/assets/mw/static/art/dict/wheel.gif',
  idioma:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rosetta_Stone.JPG/800px-Rosetta_Stone.JPG'
};

const languages = Object.values(Language);

const queries = {
  [Language.English]: 'wheel',
  [Language.Spanish]: 'idioma'
};

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
      it(`should start a ${game.type} game with minimal words in ${lang} language`, () => {
        const query = queries[lang];
        cy.presetLanguage(lang);
        cy.visit('/games');
        cy.addWord(query);
        if (lang === Language.Spanish) {
          cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
          cy.getByCy('wordCard').click();
          cy.getByCy('editButton').click();
          cy.editWord({ imgUrl: imgUrls.idioma });
          cy.getByCy('wordForm').find('button[type="submit"]').click();
          cy.getByCy('spinner').should('not.exist');
        }
        cy.get('@headerLink').contains(HEADER_TEXTS.practice).click();
        cy.getByCy('gameCard').eq(game.orderNum).click();
        cy.checkPathName(`/games/${game.id}`);
        checkGame(GameStage.Initial, game.type, query);
        cy.getByCy('exit-game').click();
        cy.checkPathName('/games');
      });

      it(`should answer incorrectly and finish a ${game.type} game in ${lang} language`, () => {
        cy.presetLanguage(lang);
        cy.visit('/games');
        const query = queries[lang];
        cy.addWord(query, query);
        if (lang === Language.Spanish) {
          cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
          cy.getByCy('wordCard').click();
          cy.getByCy('editButton').click();
          cy.editWord({ imgUrl: imgUrls.idioma });
          cy.getByCy('wordForm').find('button[type="submit"]').click();
          cy.getByCy('spinner').should('not.exist');
        }
        cy.get('@headerLink').contains(HEADER_TEXTS.practice).click();
        cy.getByCy('gameCard').eq(game.orderNum).click();
        cy.checkPathName(`/games/${game.id}`);
        playGameOnce(game.type, incorrectAnswers[lang]);
        checkGame(GameStage.Error, game.type, query, imgUrls[query]);
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

      it(`should answer correctly and finish a ${game.type} game in ${lang} language`, () => {
        cy.presetLanguage(lang);
        cy.visit('/games');
        cy.addWord(queries[lang], queries[lang]);
        if (lang === Language.Spanish) {
          cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
          cy.getByCy('wordCard').click();
          cy.getByCy('editButton').click();
          cy.editWord({ imgUrl: imgUrls.idioma });
          cy.getByCy('wordForm').find('button[type="submit"]').click();
          cy.getByCy('spinner').should('not.exist');
        }
        cy.get('@headerLink').contains(HEADER_TEXTS.practice).click();
        cy.getByCy('gameCard').eq(game.orderNum).click();
        cy.checkPathName(`/games/${game.id}`);
        playGameOnce(game.type, queries[lang]);
        checkGame(GameStage.Success, game.type, queries[lang]);
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
