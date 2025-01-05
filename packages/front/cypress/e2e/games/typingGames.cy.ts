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

const audioUrls = {
  [Language.Spanish]:
    'https://media.merriam-webster.com/audio/prons/es/me/mp3/i/idiom01sp.mp3',
  [Language.English]:
    'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
};

const languages = Object.values(Language);

const typingGames = games.filter(
  game =>
    game.type === Game.Audio ||
    game.type === Game.TypeWord ||
    game.type === Game.Image
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
