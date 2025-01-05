/* eslint-disable jest/valid-expect */
/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

import { Game, Language, Tense } from '../../../src/generated/graphql';
import { GameStage } from '../../support/constants';
import {
  checkGame,
  checkResultScreen,
  playConjugationGame,
  startConjugationGame
} from '../../support/helpers/game';

const audioUrls = {
  [Language.Spanish]:
    'https://media.merriam-webster.com/audio/prons/es/me/mp3/i/idiom01sp.mp3',
  [Language.English]:
    'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
};

const languages = Object.values(Language);
const tenses = Object.values(Tense);

const correctConjAnswers = {
  [Tense.Pind]: 'soy, eres, es, somos, sois, son',
  [Tense.Impf]: '-, sé, sea, seamos, sed, sean',
  [Tense.Pret]: 'era, eras, era, éramos, erais, eran',
  [Tense.Pprf]: 'fui, fuiste, fue, fuimos, fuisteis, fueron',
  [Tense.Futr]:
    'ser\u00e9, ser\u00e1s, ser\u00e1, seremos, ser\u00e9is, ser\u00e1n',
  [Tense.Cond]:
    'ser\u00eda, ser\u00edas, ser\u00eda, ser\u00edamos, ser\u00edais, ser\u00edan',
  [Tense.Psub]: 'sea, seas, sea, seamos, se\u00e1is, sean',
  [Tense.Ppci]:
    'he sido, has sido, ha sido, hemos sido, hab\u00e9is sido, han sido'
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
  [Tense.Psub]: 'sea, seas, sea, seamos, se\u00e1is, seans',
  [Tense.Ppci]:
    'he sido, ha sido, has sido, hemos sido, hab\u00e9is sido, han sido'
};

const serAudio =
  'https://media.merriam-webster.com/audio/prons/es/me/mp3/s/ser0001sp.mp3';

describe('Game Page - Conjugation', () => {
  beforeEach(() => {
    cy.task('prepareDB');
    cy.presetLanguage(Language.Spanish);
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
        'ser',
        `@audioReq-ser`,
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
        'ser',
        `@audioReq-ser`,
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
});
