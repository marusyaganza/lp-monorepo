/// <reference types="Cypress" />

import { Game, Language, Tense } from '../../../src/generated/graphql';
import { gameFooterMessages } from '../mocks/gamePageData';
import { GameStage, HEADER_TEXTS, TENSES, tasks } from '../constants';

const defs = {
  idioma: 'language',
  quix: 'delightful feeling of anticipation and excitement that arises before embarking on a new adventure or journey.',
  wheel:
    'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
  espirelar:
    'to take a leisurely stroll through a park or natural setting, breathing deeply to refresh your spirit.'
};

const examples = {
  wheel: [
    '… drivers are expected to keep their hands on the wheel and remain attentive',
    'a big wheel'
  ],
  idioma: ['el idioma ingl\u00e9s (the English language)']
};

const additionalInfo = {
  ser: 'ser means to be',
  idioma: 'idioma means language',
  wheel:
    'wheel means a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle'
};

export function playGameOnce(gameType: Game, answer: string) {
  if (gameType === Game.TypeWord || gameType === Game.Audio) {
    cy.getByCy('gameAnswer').find('input').type(`${answer}{Enter}`);
  }
  if (gameType === Game.SelectWord) {
    cy.getByCy('gameAnswer').find('label').contains(answer).click();
    cy.getByCy('check-button').click();
  }
  if (gameType === Game.SelectDef) {
    cy.getByCy('gameAnswer').find('label').contains(defs[answer]).click();
    cy.getByCy('check-button').click();
  }
}

export function playConjugationGame(answer: string) {
  const answers = answer?.split(', ');
  answers?.forEach((answer, i) => {
    if (answer === '-') {
      return;
    }
    cy.getByCy('gameAnswer').find('input').eq(i).type(answer);
  });

  cy.getByCy('check-button').click();
}

export function startConjugationGame(query: string, tense: Tense) {
  cy.changeLanguage(Language.Spanish);
  cy.addWord(query);
  cy.getByCy('headerNav').contains(HEADER_TEXTS.practice).click();
  cy.getByCy('gameCard').last().click();
  cy.checkPathName('/games/conjugate');
  cy.getByCy('tense-selector').find('button').click();
  cy.getByCy('selectOptions').contains(TENSES[tense]).click();
  cy.getByCy('conjugate-btn').contains('Continue').click();
  cy.checkPathName('/games/conjugation');
  cy.getByCy('spinner').should('not.exist');
}

export function checkGame(
  stage: GameStage,
  gameType: Game,
  audioReq: string,
  wordName: string,
  imgUrl?: string,
  tense = Tense.Pind,
  correctAnswer = wordName
) {
  cy.getByCy('gameFooterMessage').then($msg => {
    const text = $msg.text();
    cy.wrap(text).should('be.oneOf', gameFooterMessages[stage]);
  });

  const task =
    gameType === Game.Conjugation
      ? `Conjugate the verb in ${TENSES[tense]}`
      : tasks[gameType];
  cy.getByCy('gameTask').should('contain', task);

  if (stage === GameStage.Error) {
    const answer = gameType === Game.SelectDef ? defs[wordName] : correctAnswer;
    cy.getByCy('correctAnswer').parent().should('contain', answer);
  }

  if (stage === GameStage.Initial) {
    if (gameType !== Game.TypeWord && gameType !== Game.SelectWord) {
      cy.checkReq(audioReq);
    }
    cy.getByCy('game-progress').should('have.value', 0);
    cy.getByCy('exit-game').should('be.enabled').should('contain', 'Exit game');
    cy.getByCy('gameAnswer').should('be.visible');
    cy.getByCy('check-button').should('be.disabled');
  } else {
    if (gameType === Game.TypeWord || gameType === Game.SelectWord) {
      cy.checkReq(audioReq);
    }
    cy.getByCy('check-button').should('not.exist');
    cy.getByCy('continue-button').should('be.enabled').and('be.focused');
    cy.getByCy('gameAnswer')
      .find('input')
      .each($input => {
        cy.wrap($input).should('be.disabled');
      });

    const exs = examples[wordName];
    if (exs) {
      cy.getByCy('examples').find('h3').should('have.text', 'Examples');
      exs.forEach((ex, i) => {
        cy.getByCy('examples').find('li').eq(i).should('contain', ex);
      });
    }

    if (imgUrl) {
      cy.getByCy('additionalInfo')
        .find('img')
        .should('be.visible')
        .and('have.attr', 'src', imgUrl);
    }

    if (gameType === Game.Conjugation || gameType === Game.Audio) {
      const info = additionalInfo[wordName];
      if (info) {
        cy.getByCy('additionalInfo').should('contain', info);
      }
    }
  }
}

export function checkResultScreen(
  percentage: number | string,
  wordsNum: number,
  answeredCorrectly: number
) {
  cy.getByCy('gameResult').find('h1').should('contain', 'Training complete');
  cy.getByCy('gameResult')
    .find('p')
    .eq(0)
    .should('contain', `Your result: ${percentage}%`);
  cy.getByCy('gameResult')
    .find('p')
    .eq(1)
    .should('contain', `Learned words: ${wordsNum}`);
  cy.getByCy('gameResult')
    .find('p')
    .eq(2)
    .should('contain', `Answered correctly: ${answeredCorrectly}`);

  cy.getByCy('finish-game').should('be.focused').should('have.text', 'Finish');
}
