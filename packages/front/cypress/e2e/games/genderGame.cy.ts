/* eslint-disable jest/valid-expect */
/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

import {
  Game,
  Language,
  UpdateWordInput
} from '../../../src/generated/graphql';
import { GameStage, HEADER_TEXTS } from '../../support/constants';
import {
  checkGame,
  checkResultScreen,
  playGameWithMultipleAnswers
} from '../../support/helpers/game';
import { DEFAULT_GAMES_SETTINGS } from '../../support/mocks/gamesSettings';

const game = DEFAULT_GAMES_SETTINGS[Game.Gender];

const queries = ['idioma', 'ecologista', 'ballena'];

const audioUrls = {
  idioma:
    'https://media.merriam-webster.com/audio/prons/es/me/mp3/i/idiom01sp.mp3',
  ecologista:
    'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3',
  ballena:
    'https://media.merriam-webster.com/audio/prons/es/me/mp3/b/balle01sp.mp3'
};

const imgUrls = {
  ecologista:
    'https://upload.wikimedia.org/wikipedia/commons/7/70/Bufo_boreas.jpg',
  idioma:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rosetta_Stone.JPG/800px-Rosetta_Stone.JPG',
  ballena: 'https://cdn.langeek.co/photo/28884/original/whale?type=jpeg'
};

const answers = {
  ecologista: ['feminine'],
  idioma: ['masculine'],
  ballena: ['masculine']
};

const correctAnswers = {
  ecologista: 'feminine, or masculine',
  ballena: 'feminine',
  idioma: undefined
};

describe('Game Page - Gender', () => {
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
    queries.forEach(query => {
      cy.intercept({
        method: 'GET',
        url: `${audioUrls[query]}`
      }).as(`audioReq-${query}`);
    });
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });

  it(`start gender game with minimal words`, () => {
    const query = 'idioma';
    cy.addWord(query);
    cy.get('@headerLink').contains(HEADER_TEXTS.practice).click();
    cy.getByCy('gameCard').eq(game.orderNum).click();
    cy.checkPathName(`/games/${Game.Gender.toLowerCase()}`);
    checkGame(GameStage.Initial, Game.Gender, query);
    cy.getByCy('exit-game').click();
    cy.checkPathName('/games');
  });

  it(`should answer incorrectly and finish gender game`, () => {
    const query = queries[0];

    cy.addWord(query, query);

    cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
    cy.getByCy('wordCard').click();
    cy.getByCy('editButton').click();
    cy.editWord({ imgUrl: imgUrls.idioma });
    cy.getByCy('wordForm').find('button[type="submit"]').click();
    cy.getByCy('spinner').should('not.exist');

    cy.get('@headerLink').contains(HEADER_TEXTS.practice).click();
    cy.getByCy('gameCard').eq(game.orderNum).click();
    cy.checkPathName(`/games/${Game.Gender.toLowerCase()}`);
    playGameWithMultipleAnswers(['feminine']);
    checkGame(
      GameStage.Error,
      Game.Gender,
      `@audioReq-${query}`,
      query,
      imgUrls[query],
      undefined,
      'masculine'
    );
    cy.getByCy('continue-button').click();
    checkResultScreen(0, 1, 0);
    cy.intercept('POST', 'http://localhost:4000/graphql').as('saveGameResult');

    cy.getByCy('finish-game').click();
    cy.wait('@saveGameResult')
      .its('request.body')
      .should(body => {
        expect(body.operationName).to.equal('SaveGameResult');
        expect(body.variables.input[0]).to.include({
          hasError: true,
          gameType: Game.Gender
        });
      });
  });

  it(`should answer correctly and finish gender game`, () => {
    const query = queries[0];

    cy.addWord(query, query);

    cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
    cy.getByCy('wordCard').click();
    cy.getByCy('editButton').click();
    cy.editWord({ imgUrl: imgUrls.idioma });
    cy.getByCy('wordForm').find('button[type="submit"]').click();
    cy.getByCy('spinner').should('not.exist');

    cy.get('@headerLink').contains(HEADER_TEXTS.practice).click();
    cy.getByCy('gameCard').eq(game.orderNum).click();
    cy.checkPathName(`/games/${Game.Gender.toLowerCase()}`);
    playGameWithMultipleAnswers(['masculine']);

    checkGame(
      GameStage.Success,
      Game.Gender,
      `@audioReq-${query}`,
      query,
      imgUrls[query],
      undefined,
      'masculine'
    );
    cy.getByCy('continue-button').click();
    checkResultScreen(100, 1, 1);
    cy.intercept('POST', 'http://localhost:4000/graphql').as('saveGameResult');

    cy.getByCy('finish-game').click();
    cy.wait('@saveGameResult')
      .its('request.body')
      .should(body => {
        expect(body.operationName).to.equal('SaveGameResult');
        expect(body.variables.input[0]).to.include({
          hasError: false,
          gameType: Game.Gender
        });
      });
  });

  it(`should play gender game with multiple words`, () => {
    queries.forEach(query => {
      cy.addWord(query, query);
      const wordUpdate: Partial<UpdateWordInput> = { imgUrl: imgUrls[query] };
      if (!audioUrls[query]) {
        wordUpdate.audioUrl = audioUrls[query];
      }
      cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
      cy.getByCy(`wordcard-${query}`).click();
      cy.getByCy('editButton').click();
      cy.editWord(wordUpdate);
      cy.getByCy('wordForm').find('button[type="submit"]').click();
      cy.getByCy('spinner').should('not.exist');
    });

    cy.get('@headerLink').contains(HEADER_TEXTS.practice).click();
    cy.getByCy('gameCard').eq(game.orderNum).click();
    cy.checkPathName(`/games/${Game.Gender.toLowerCase()}`);

    queries.forEach(query => {
      playGameWithMultipleAnswers(answers[query]);
      checkGame(
        correctAnswers[query] ? GameStage.Error : GameStage.Success,
        Game.Gender,
        `@audioReq-${query}`,
        query,
        imgUrls[query],
        undefined,
        correctAnswers[query]
      );
      cy.getByCy('continue-button').click();
    });

    checkResultScreen(33, 3, 1);
    cy.intercept('POST', 'http://localhost:4000/graphql').as('saveGameResult');

    cy.getByCy('finish-game').click();
    cy.wait('@saveGameResult')
      .its('request.body')
      .should(body => {
        expect(body.operationName).to.equal('SaveGameResult');
        expect(body.variables.input[0]).to.include({
          hasError: false,
          gameType: Game.Gender
        });
        expect(body.variables.input[1]).to.include({
          hasError: true,
          gameType: Game.Gender
        });
        expect(body.variables.input[2]).to.include({
          hasError: true,
          gameType: Game.Gender
        });
      });
  });
});
