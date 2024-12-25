/* eslint-disable jest/valid-expect */
/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

import { Game, Language, Tense } from '../../src/generated/graphql';
import { GameStage, HEADER_TEXTS } from '../support/constants';
import { games } from '../support/mocks/games';
import {
  checkGame,
  checkResultScreen,
  playConjugationGame,
  playGameOnce,
  startConjugationGame
} from '../support/helpers/game';

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
const tenses = Object.values(Tense);

const queries = {
  [Language.English]: 'wheel',
  [Language.Spanish]: 'idioma'
};

const incorrectAnswers = {
  [Language.English]: 'quix',
  [Language.Spanish]: 'espirelar'
};

const correctConjAnswers = {
  [Tense.Pind]: 'soy, eres, es, somos, sois, son',
  [Tense.Impf]: '-, sé, sea, seamos, sed, sean',
  [Tense.Pret]: 'era, eras, era, éramos, erais, eran',
  [Tense.Pprf]: 'fui, fuiste, fue, fuimos, fuisteis, fueron',
  [Tense.Futr]:
    'ser\u00e9, ser\u00e1s, ser\u00e1, seremos, ser\u00e9is, ser\u00e1n',
  [Tense.Cond]:
    'ser\u00eda, ser\u00edas, ser\u00eda, ser\u00edamos, ser\u00edais, ser\u00edan',
  [Tense.Psub]: 'sea, seas, sea, seamos, se\u00e1is, sean'
};

const incorrectConjAnswers = {
  [Tense.Pind]: 'soy, eres, es, somais, sois, son',
  [Tense.Impf]: '-, se, sea, seamos, sed, sean',
  [Tense.Pret]: 'era, eras, era, eramos, erais, eran',
  [Tense.Pprf]: 'fue, fuiste, fui, fuimos, fuisteis, fueron',
  [Tense.Futr]:
    'ser\u00e9, ser\u00e1s, ser\u00e1, sereamos, ser\u00e9is, ser\u00e1n',
  [Tense.Cond]:
    'ser\u00eda, ser\u00edas, ser\u00eda, sero\u00edamos, ser\u00edais, ser\u00edan',
  [Tense.Psub]: 'sea, seas, sea, seamos, se\u00e1is, seans'
};

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

  tenses.forEach(tense => {
    it(`start conjugation game with minimal words in ${tense} tense`, () => {
      const gameType = Game.Conjugation;
      startConjugationGame('ser', tense);
      checkGame(
        GameStage.Initial,
        gameType,
        `@audioReq-ser`,
        'ser',
        undefined,
        tense
      );
      cy.getByCy('exit-game').click();
      cy.checkPathName('/games');
    });

    it(`should answer correctly and finish conjugation game with minimal words in ${tense} tense`, () => {
      const gameType = Game.Conjugation;
      startConjugationGame('ser', tense);
      playConjugationGame(correctConjAnswers[tense]);
      checkGame(
        GameStage.Success,
        gameType,
        `@audioReq-ser`,
        'ser',
        undefined,
        tense
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
            gameType
          });
        });
    });

    it(`should answer incorrectly and finish conjugation game with minimal words in ${tense} tense`, () => {
      const gameType = Game.Conjugation;
      startConjugationGame('ser', tense);
      playConjugationGame(incorrectConjAnswers[tense]);
      checkGame(
        GameStage.Error,
        gameType,
        `@audioReq-ser`,
        'ser',
        undefined,
        tense,
        correctConjAnswers[tense]
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
            gameType
          });
        });
    });
  });

  languages.forEach(lang => {
    const availableGames = games.filter(
      game => game.type !== Game.Conjugation && game?.type !== Game.Gender
    );
    availableGames.forEach((game, i) => {
      it(`should start ${game.id} game with minimal words in ${lang} language`, () => {
        const query = queries[lang];
        cy.changeLanguage(lang);
        cy.addWord(query);
        cy.get('@headerLink').contains(HEADER_TEXTS.practice).click();
        cy.getByCy('gameCard').eq(i).click();
        cy.checkPathName(`/games/${game.id}`);
        checkGame(GameStage.Initial, game.type, `@audioReq-${lang}`, query);
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
        cy.getByCy('gameCard').eq(i).click();
        cy.checkPathName(`/games/${game.id}`);
        playGameOnce(game.type, incorrectAnswers[lang]);
        checkGame(
          GameStage.Error,
          game.type,
          `@audioReq-${lang}`,
          query,
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
        cy.getByCy('gameCard').eq(i).click();
        cy.checkPathName(`/games/${game.id}`);
        playGameOnce(game.type, queries[lang]);
        checkGame(
          GameStage.Success,
          game.type,
          `@audioReq-${lang}`,
          queries[lang]
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
