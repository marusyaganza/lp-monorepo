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

const audioUrls = {
  [Language.Spanish]:
    'https://media.merriam-webster.com/audio/prons/es/me/mp3/i/idiom01sp.mp3',
  [Language.English]:
    'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
};

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

const typingGames = games.filter(
  game => game.type === Game.Audio || game.type === Game.TypeWord
);

const serAudio =
  'https://media.merriam-webster.com/audio/prons/es/me/mp3/s/ser0001sp.mp3';

describe('Game Page', () => {
  beforeEach(() => {
    cy.task('prepareDB');
    cy.login();
    cy.visit('/games');
    cy.get('[data-cy="sortControls"]').as('sortControls');
    cy.get('@sortControls').find('[data-cy="select"]').as('select');
    cy.get('[data-cy="headerNav"] a').as('headerLink');
    cy.get('[data-cy="gamesList"]').as('gamesList');
    cy.get('@gamesList').find('[data-cy="gameCard"]').as('gameCard');

    languages.forEach(lang => {
      cy.intercept({
        method: 'GET',
        url: `${audioUrls[lang]}`
      }).as(`audioReq-${lang}`);
    });
    cy.intercept({
      method: 'GET',
      url: serAudio
    }).as(`audioReq-ser`);
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });

  languages.forEach(lang => {
    const availableGames = games.filter(
      game => game.type !== Game.Conjugation && game.type !== Game.Gender
    );
    availableGames.forEach(game => {
      it(`should start ${game.id} game with minimal words in ${lang} language`, () => {
        const query = queries[lang];
        cy.changeLanguage(lang);
        cy.addWord(query);
        cy.get('@headerLink').contains(HEADER_TEXTS.practice).click();
        cy.getByCy('gameCard').eq(game.orderNum).click();
        cy.checkPathName(`/games/${game.id}`);
        checkGame(GameStage.Initial, game.type, query, `@audioReq-${lang}`);
        cy.getByCy('exit-game').click();
        cy.checkPathName('/games');
      });

      it(`should answer incorrectly and finish ${game.id} game in ${lang} language`, () => {
        cy.changeLanguage(lang);
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
        checkGame(
          GameStage.Error,
          game.type,
          query,
          `@audioReq-${lang}`,
          imgUrls[query]
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

      it(`should answer correctly and finish ${game.id} game in ${lang} language`, () => {
        cy.changeLanguage(lang);
        cy.addWord(queries[lang], queries[lang]);
        cy.get('@headerLink').contains(HEADER_TEXTS.practice).click();
        cy.getByCy('gameCard').eq(game.orderNum).click();
        cy.checkPathName(`/games/${game.id}`);
        playGameOnce(game.type, queries[lang]);
        checkGame(
          GameStage.Success,
          game.type,
          queries[lang],
          `@audioReq-${lang}`
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

      it(`should answer incorrectly ${game.id} game with alt. spelling in ${lang} language`, () => {
        cy.changeLanguage(lang);
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
          `@audioReq-${lang}`,
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

      it(`should answer correctly ${game.id} game with main spelling in ${lang} language`, () => {
        cy.changeLanguage(lang);
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
          `@audioReq-${lang}`,
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
    typingGames.forEach(game => {
      it(`should answer correctly ${game.id} game with alt. spelling in ${lang} language`, () => {
        cy.changeLanguage(lang);
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
        playGameOnce(game.type, wordInput.alternativeSpelling[0]);

        checkGame(
          GameStage.Success,
          game.type,
          wordInput.name,
          `@audioReq-${lang}`,
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
