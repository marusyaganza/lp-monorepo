/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

const gameFooterMessages = {
  success: [
    'Great job! Language skills shining!',
    'Impressive work! Mastering language!',
    "You've got it! Keep learning!",
    'Well done! Proficiency rising!',
    'Fantastic effort! Flourishing skills!',
    'Keep it up! Language virtuoso!',
    'Incredible job! Remarkable grasp!',
    'Nailed it! Inspiring progress!',
    'Outstanding! Unmatched aptitude!',
    'Acing it! Commendable dedication!'
  ],
  error: [
    "Keep going, you're making progress!",
    "Mistakes are stepping stones to success. Don't give up!",
    "You've got this! Keep practicing!",
    'Learning is a journey. Keep pushing forward!',
    'Embrace challenges to learn and grow!',
    "Believe in yourself! You'll master it.",
    "Keep at it, and you'll see results!",
    "You're getting there! Keep practicing!",
    'Progress comes from perseverance!',
    "Stay positive! You've got this!"
  ],
  initial: ["Let's get started"]
};

const defs = [
  'a circular frame of hard material that may be solid, partly solid, or spoked and that is capable of turning on an axle',
  'a contrivance or apparatus having as its principal part a wheel: such as',
  'a chiefly medieval instrument of torture designed for mutilating a victim (as by stretching or disjointing)'
];

const examples = [
  '… drivers are expected to keep their hands on the wheel and remain attentive',
  'a big wheel'
];

const imgUrl =
  'https://merriam-webster.com/assets/mw/static/art/dict/wheel.gif';

describe('Words Page', () => {
  beforeEach(() => {
    cy.task('prepareDB');
    cy.login();
    cy.visit('/search');

    cy.intercept({
      method: 'GET',
      url: 'https://media.merriam-webster.com/audio/prons/en/us/mp3/w/wheel001.mp3'
    }).as('audioReq');

    cy.get('[data-cy="searchForm"]').find('input').type('wheel');
    cy.get('[data-cy="searchForm"]').submit();
    cy.get('[data-cy="addButton"]').first().click();

    cy.visit('/games');

    cy.get('[data-cy="gamesList"]')
      .find('[data-cy="gameCard"]')
      .find('a')
      .as('gameCard');
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });

  it('should render all the elements of Audio Game correctly', () => {
    cy.get('@gameCard').first().click();

    cy.get('[data-cy="gameAnswer"]')
      .find('input')
      .should('have.attr', 'value', '');

    cy.get('[data-cy="audioButton"]').should('be.enabled');

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        expect(gameFooterMessages.initial.includes(text));
      });

    cy.get('header > progress').should('be.visible').and('have.value', 50);
    cy.get('header > button').should('be.enabled');
    cy.get('[data-cy="gameForm"] > button')
      .should('have.text', 'Check')
      .and('be.disabled');

    cy.get('[data-cy="gameTask"]').should(
      'have.text',
      "Type the word that you've heard "
    );

    cy.wait('@audioReq').then(interception => {
      assert.isNotNull(interception?.response?.body, 'audioURL call');
    });

    cy.get('header > button').should('be.enabled').click();

    cy.location().should('have.a.property', 'pathname', '/games');
  });

  it('should render all the elements of Select def Game correctly', () => {
    cy.get('@gameCard').eq(1).click();

    cy.get('[data-cy="gameTask"]').should(
      'have.text',
      'Select a definition that means  '
    );

    cy.get('[data-cy="gameQuestion"]').should('have.text', 'wheel');
    cy.get('[data-cy="audioButton"]').should('be.enabled');

    cy.get('[data-cy="optionBox"]').find('input').should('have.length', 6);
    cy.get('[data-cy="optionBox"]').find('label').contains(defs[0]);

    cy.get('[data-cy="gameForm"] > button')
      .should('have.text', 'Check')
      .and('be.disabled');

    cy.get('[data-cy="gameFooter"]').find('[data-cy="gameFooterMessage"]');

    cy.get('header > progress').should('be.visible').and('have.value', 50);
    cy.get('header > button').should('be.enabled').click();

    cy.location().should('have.a.property', 'pathname', '/games');
  });

  it('should render all the elements of Select word Game correctly', () => {
    cy.get('@gameCard').eq(2).click();

    cy.get('[data-cy="gameTask"]').should(
      'have.text',
      'Select a word that means  '
    );

    cy.get('[data-cy="gameQuestion"]').as('question').should('have.length', 3);
    cy.get('@question').first().should('have.text', defs[0]);
    cy.get('@question').eq(1).should('have.text', defs[1]);
    cy.get('@question').last().should('have.text', defs[2]);

    cy.get('[data-cy="audioButton"]').should('not.exist');

    cy.get('[data-cy="optionBox"]').find('input').should('have.length', 6);
    cy.get('[data-cy="optionBox"]').find('label').contains('wheel');

    cy.get('[data-cy="gameForm"] > button')
      .should('have.text', 'Check')
      .and('be.disabled');

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .should('have.text', gameFooterMessages.initial[0]);

    cy.get('header > progress').should('be.visible').and('have.value', 50);
    cy.get('header > button').should('be.enabled').click();

    cy.location().should('have.a.property', 'pathname', '/games');
  });

  it('should render all the elements of Type Word Game correctly', () => {
    cy.get('@gameCard').last().click();

    cy.get('[data-cy="gameAnswer"]')
      .find('input')
      .should('have.attr', 'value', '');

    cy.get('[data-cy="audioButton"]').should('not.exist');

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .should('have.text', gameFooterMessages.initial[0]);
    cy.get('header > progress').should('be.visible').and('have.value', 50);
    cy.get('header > button').should('be.enabled');
    cy.get('[data-cy="gameForm"] > button')
      .should('have.text', 'Check')
      .and('be.disabled');

    cy.get('[data-cy="gameTask"]').should(
      'have.text',
      'Type a word that means  '
    );

    cy.get('[data-cy="gameQuestion"]').should('have.length', 3);

    cy.get('header > button').should('be.enabled').click();

    cy.location().should('have.a.property', 'pathname', '/games');
  });

  it('should give a wrong aswer and finish Audio game', () => {
    cy.get('@gameCard').first().click();

    cy.get('[data-cy="gameAnswer"]').find('input').type('weel');

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        expect(gameFooterMessages.error.includes(text));
      });

    cy.get('[data-cy="additionalInfo"]')
      .find('img')
      .should('have.attr', 'src', imgUrl);

    cy.get('[data-cy="additionalInfo"]').contains(defs[0]);

    cy.get('[data-cy="examples"]').find('h3').should('have.text', 'Examples');
    cy.get('[data-cy="examples"]').find('li').first().contains(examples[0]);
    cy.get('[data-cy="examples"]').find('li').last().contains(examples[1]);
    cy.get('[data-cy="correctAnswer"]').should('have.text', 'wheel');

    cy.get('[data-cy="gameAnswer"]').find('input').should('be.disabled');
    cy.get('[data-cy="gameForm"] > button')
      .should('have.text', 'Continue')
      .click();

    cy.get('h1').should('have.text', 'Training complete');

    cy.get('[data-cy="gameResult"]').find('p').should('have.length', 3);
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
      .click();

    cy.location().should('have.a.property', 'pathname', '/games');
  });

  it('should give a wrong aswer and finish Type Word game', () => {
    cy.get('@gameCard').last().click();

    cy.get('[data-cy="gameAnswer"]').find('input').type('wejsdkfel ');

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        expect(gameFooterMessages.error.includes(text));
      });

    cy.get('[data-cy="additionalInfo"]')
      .find('img')
      .should('have.attr', 'src', imgUrl);

    cy.get('[data-cy="audioButton"]').should('be.enabled');

    cy.get('[data-cy="examples"]').find('h3').should('have.text', 'Examples');
    cy.get('[data-cy="examples"]').find('li').first().contains(examples[0]);
    cy.get('[data-cy="examples"]').find('li').last().contains(examples[1]);
    cy.get('[data-cy="correctAnswer"]').should('have.text', 'wheel');

    cy.get('[data-cy="gameAnswer"]').find('input').should('be.disabled');
    cy.get('[data-cy="gameForm"] > button')
      .should('have.text', 'Continue')
      .click();

    cy.get('h1').should('have.text', 'Training complete');

    cy.get('[data-cy="gameResult"]').find('p').should('have.length', 3);
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
      .click();

    cy.location().should('have.a.property', 'pathname', '/games');
  });

  it('should give a wrong aswer and finish Select def game', () => {
    cy.get('@gameCard').eq(1).click();

    cy.get('[data-cy="optionBox"]')
      .find('label')
      .contains(
        'a gentle, soothing sensation experienced when a cool breeze rustles through leaves on a warm summer day'
      )
      .click();

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        expect(gameFooterMessages.error.includes(text));
      });

    cy.get('[data-cy="additionalInfo"]')
      .find('img')
      .should('have.attr', 'src', imgUrl);

    cy.get('[data-cy="examples"]').find('h3').should('have.text', 'Examples');
    cy.get('[data-cy="examples"]').find('li').first().contains(examples[0]);
    cy.get('[data-cy="examples"]').find('li').last().contains(examples[1]);

    cy.get('[data-cy="optionBox"]').find('input').should('be.disabled');
    cy.get('[data-cy="gameForm"] > button')
      .should('have.text', 'Continue')
      .click();

    cy.get('h1').should('have.text', 'Training complete');

    cy.get('[data-cy="gameResult"]').find('p').should('have.length', 3);
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
      .click();

    cy.location().should('have.a.property', 'pathname', '/games');
  });

  it('should give a wrong aswer and finish Select Word game', () => {
    cy.get('@gameCard').eq(2).click();

    cy.get('[data-cy="optionBox"]').find('label').contains('zephral').click();

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        expect(gameFooterMessages.error.includes(text));
      });

    cy.get('[data-cy="additionalInfo"]')
      .find('img')
      .should('have.attr', 'src', imgUrl);

    cy.get('[data-cy="examples"]').find('h3').should('have.text', 'Examples');
    cy.get('[data-cy="examples"]').find('li').first().contains(examples[0]);
    cy.get('[data-cy="examples"]').find('li').last().contains(examples[1]);

    cy.get('[data-cy="audioButton"]').should('be.enabled');

    cy.get('[data-cy="optionBox"]').find('input').should('be.disabled');
    cy.get('[data-cy="gameForm"] > button')
      .should('have.text', 'Continue')
      .click();

    cy.get('h1').should('have.text', 'Training complete');

    cy.get('[data-cy="gameResult"]').find('p').should('have.length', 3);
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
      .click();

    cy.location().should('have.a.property', 'pathname', '/games');
  });

  it('should give a correct aswer and finish Audio Word game', () => {
    cy.get('@gameCard').first().click();

    cy.get('[data-cy="gameAnswer"]').find('input').type(' wheel {Enter}');

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        expect(gameFooterMessages.success.includes(text));
      });

    cy.get('[data-cy="correctAnswer"]').should('not.be.visible');

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
  });

  it('should give a correct aswer and finish Type Word game', () => {
    cy.get('@gameCard').last().click();

    cy.get('[data-cy="gameAnswer"]').find('input').type(' wheel {Enter}');

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        expect(gameFooterMessages.success.includes(text));
      });

    cy.get('[data-cy="correctAnswer"]').should('not.be.visible');

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
  });

  it('should give a correct aswer and finish Select def game', () => {
    cy.get('@gameCard').eq(1).click();

    cy.get('[data-cy="optionBox"]').find('label').contains(defs[0]).click();

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        expect(gameFooterMessages.success.includes(text));
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
  });

  it('should give a correct aswer and finish Select Word game', () => {
    cy.get('@gameCard').eq(2).click();

    cy.get('[data-cy="optionBox"]').find('label').contains('wheel').click();

    cy.get('[data-cy="gameForm"] > button').click();

    cy.get('[data-cy="gameFooter"]')
      .find('[data-cy="gameFooterMessage"]')
      .then($msg => {
        const text = $msg.text();
        expect(gameFooterMessages.success.includes(text));
      });

    cy.get('[data-cy="gameForm"] > button').should('have.focus').click();

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
  });
});
