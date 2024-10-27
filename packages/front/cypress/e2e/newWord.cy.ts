/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

import { mockNewWord, minNewWord } from '../support/mocks/mockData';

describe('Words Page', () => {
  beforeEach(() => {
    cy.task('prepareDB');
    cy.login();
    cy.visit('/words/new');
    cy.get('[data-cy="headerNav"] a').as('headerLink');
    cy.intercept({
      method: 'GET',
      url: `${mockNewWord.audioUrl}`
    }).as('audioReq');
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });

  it('should render all the elements correctly', () => {
    cy.get('h1').should('have.text', 'Add new word');

    cy.get('[data-cy="formField-name"]')
      .find('label')
      .should('have.text', 'name');

    cy.get('[data-cy="formField-particle"]')
      .find('label')
      .should('have.text', 'particle');

    cy.get('[data-cy="formField-particle"]')
      .find('textarea')
      .should('be.empty');

    cy.get('[data-cy="formField-defs"]')
      .find('[data-cy="exampleInput"]')
      .find('textarea')
      .should('be.empty');

    cy.get('[data-cy="formField-defs"]')
      .find('[data-cy="exampleInput"]')
      .find('label')
      .should('have.text', 'example 1');

    cy.get('[data-cy="exampleInput"]')
      .find('[data-cy="button-plus"]')
      .should('be.enabled');

    cy.get('[data-cy="formField-defs"]')
      .find('[data-cy="defInput"]')
      .find('textarea')
      .should('be.empty');

    cy.get('[data-cy="formField-defs"]')
      .find('[data-cy="defInput"]')
      .find('label')
      .should('have.text', 'definition 1');

    cy.get('[data-cy="defInput"]')
      .find('[data-cy="button-plus"]')
      .should('be.enabled');

    cy.get('[data-cy="formField-shortDef"]')
      .find('textarea')
      .should('be.empty');

    cy.get('[data-cy="formField-shortDef"]')
      .find('label > span')
      .should('have.text', 'short definition 1');

    cy.get('[data-cy="formField-shortDef"]')
      .find('[data-cy="button-plus"]')
      .should('be.enabled');

    cy.get('[data-cy="formField-stems"]').find('textarea').should('be.empty');
    cy.get('[data-cy="formField-stems"]')
      .find('label > span')
      .should('have.text', 'word form 1');

    cy.get('[data-cy="formField-stems"]')
      .find('[data-cy="button-plus"]')
      .should('be.enabled');

    cy.get('[data-cy="formField-additionalInfo"]')
      .find('textarea')
      .should('be.empty');

    cy.get('[data-cy="formField-additionalInfo"]')
      .find('label')
      .should('have.text', 'additional information');

    cy.get('[data-cy="formField-audioUrl"]')
      .find('label')
      .should('have.text', 'audio url');

    cy.get('[data-cy="formField-audioUrl"]')
      .find('textarea')
      .should('be.empty');

    cy.get('[data-cy="formField-transcription"]')
      .find('label')
      .should('have.text', 'transcription');

    cy.get('[data-cy="formField-transcription"]')
      .find('textarea')
      .should('be.empty');

    cy.get('[data-cy="formField-imgUrl"]')
      .find('label')
      .should('have.text', 'image url');

    cy.get('[data-cy="formField-imgUrl"]').find('textarea').should('be.empty');

    cy.get('[data-cy="formField-imgDesc"]').find('textarea').should('be.empty');

    cy.get('[data-cy="formField-imgDesc"]')
      .find('label')
      .should('have.text', 'image description');

    cy.get('[data-cy="wordForm"]')
      .find('[data-cy="checkbox"]')
      .contains('offensive');

    cy.get('[data-cy="wordForm"]')
      .find('button[type="submit"]')
      .should('have.text', 'Save');

    cy.get('[data-cy="backLink"]').should('have.attr', 'href', '/words');
  });

  it('should be able to fill the form and save a word', () => {
    /**fill the form */
    cy.get('[data-cy="formField-name"]')
      .find('textarea')
      .type(mockNewWord.name);

    cy.get('[data-cy="formField-particle"]')
      .find('textarea')
      .type(mockNewWord.particle);

    cy.get('[data-cy="formField-defs"]')
      .find('[data-cy="exampleInput"]')
      .find('textarea')
      // @ts-ignore
      .type(mockNewWord.defs[0].examples[0]);

    cy.get('[data-cy="exampleInput"]').find('[data-cy="button-plus"]').click();

    cy.get('[data-cy="formField-defs"]')
      .find('[data-cy="exampleInput"]')
      .eq(1)
      .find('textarea')
      // @ts-ignore
      .type(mockNewWord.defs[0].examples[1]);

    cy.get('[data-cy="formField-defs"]')
      .find('[data-cy="defInput"]')
      .find('textarea')
      .type(mockNewWord.defs[0].def);

    cy.get('[data-cy="defInput"]').find('[data-cy="button-plus"]').click();

    cy.get('[data-cy="formField-defs"]')
      .find('[data-cy="defInput"]')
      .eq(1)
      .find('textarea')
      // @ts-ignore
      .type(mockNewWord.defs[1].def);

    cy.get('[data-cy="formField-defs"]')
      .find('[data-cy="exampleInput"]')
      .eq(2)
      .find('textarea')
      // @ts-ignore
      .type(mockNewWord.defs[1].examples[0]);

    cy.get('[data-cy="defInput"]')
      .last()
      .find('[data-cy="button-plus"]')
      .click();

    cy.get('[data-cy="defInput"]')
      .last()
      .find('textarea')
      .type(mockNewWord.defs[2].def);

    cy.get('[data-cy="formField-shortDef"]')
      .find('textarea')
      .type(mockNewWord.shortDef[0]);

    cy.get('[data-cy="formField-shortDef"]')
      .find('[data-cy="button-plus"]')
      .click();

    cy.get('[data-cy="formField-shortDef"]')
      .last()
      .find('textarea')
      .type(mockNewWord.shortDef[1]);

    cy.get('[data-cy="formField-shortDef"]')
      .last()
      .find('[data-cy="button-plus"]')
      .click();

    cy.get('[data-cy="formField-shortDef"]')
      .last()
      .find('textarea')
      .type(mockNewWord.shortDef[2]);

    cy.get('[data-cy="formField-stems"]')
      .find('textarea')
      .type(mockNewWord.stems[0]);

    cy.get('[data-cy="formField-stems"]')
      .find('[data-cy="button-plus"]')
      .click();

    cy.get('[data-cy="formField-stems"]')
      .last()
      .find('textarea')
      .type(mockNewWord.stems[1]);

    cy.get('[data-cy="formField-additionalInfo"]')
      .find('textarea')
      .type(mockNewWord.additionalInfo);

    cy.get('[data-cy="formField-audioUrl"]');

    cy.get('[data-cy="formField-audioUrl"]')
      .find('textarea')
      .type(mockNewWord.audioUrl);

    cy.get('[data-cy="formField-transcription"]')
      .find('textarea')
      .type(mockNewWord.transcription);

    cy.get('[data-cy="formField-imgUrl"]')
      .find('textarea')
      .type(mockNewWord.imgUrl);

    cy.get('[data-cy="formField-imgDesc"]')
      .find('textarea')
      .type(mockNewWord.imgDesc);

    cy.get('[data-cy="wordForm"]')
      .find('[data-cy="checkbox"]')
      .contains('offensive');

    cy.get('[data-cy="wordForm"]').find('button[type="submit"]').click();

    /** Check that user was redirected on the words page and the notification is displayed */

    cy.location().should('have.a.property', 'pathname', '/words');

    cy.get('[data-cy="notification-success"]')
      .as('notification')
      .should('be.visible');
    cy.get('@notification').find('h3').should('have.text', 'Word added');
    cy.get('@notification').contains(
      `${mockNewWord.name} is added successfully`
    );

    cy.get('@notification').find('button').click();

    /**validate the created word on the words page */

    cy.get('[data-cy="wordsCount"]').contains('1 words');
    cy.get('[data-cy="wordsList"]')
      .find('[data-cy="wordCard"]')
      .should('have.length', 1);

    cy.get('[data-cy="wordCard"]')
      .find('h3')
      .should('have.text', mockNewWord.name);

    cy.get('[data-cy="wordCard"]')
      .find('[data-cy="audioButton"]')
      .contains(mockNewWord.transcription);

    cy.get('[data-cy="wordCard"]').find('[data-cy="audioButton"]').click();
    cy.wait('@audioReq').then(interception => {
      assert.isNotNull(interception?.response?.body, 'audioURL call');
    });
    cy.get('[data-cy="defsList"] li').should(
      'have.length',
      mockNewWord.shortDef.length
    );

    cy.get('[data-cy="wordCard"]')
      .find('[data-cy="particle"]')
      .should('have.text', mockNewWord.particle);

    cy.get('[data-cy="wordCard"]')
      .find('[data-cy="offensive"]')
      .should('not.exist');

    cy.get('[data-cy="cardWrapper"]').click();

    /**validate the created word on the word page */

    cy.get('[data-cy="spinner"]').should('not.exist');

    cy.get('h3').should('have.text', mockNewWord.name);

    cy.get('[data-cy="audioButton"]').contains(mockNewWord.transcription);

    cy.get('[data-cy="defsList"] li').should(
      'have.length',
      mockNewWord.defs.length
    );

    cy.get('[data-cy="particle"]').should('have.text', mockNewWord.particle);

    cy.get('[data-cy="defsList"] li')
      .first()
      .find('[data-cy="example"]')
      .should('have.length', 2);

    cy.get('[data-cy="defsList"] li')
      .first()
      .find('[data-cy="example"]')
      .first()
      // @ts-ignore
      .should('have.text', mockNewWord.defs[0].examples[0]);

    cy.get('[data-cy="defsList"] li')
      .first()
      .find('[data-cy="example"]')
      .last()
      // @ts-ignore
      .should('have.text', mockNewWord.defs[0].examples[1]);

    cy.get('[data-cy="defsList"] li')
      .eq(1)
      .find('[data-cy="example"]')
      .should('have.length', 1);

    cy.get('[data-cy="defsList"] li')
      .eq(1)
      .find('[data-cy="example"]')
      .first()
      // @ts-ignore
      .should('have.text', mockNewWord.defs[1].examples2[0]);

    cy.get('[data-cy="defsList"] li')
      .last()
      .find('[data-cy="example"]')
      .should('have.length', 0);

    cy.get('[data-cy="stems"]').contains(
      `Word forms: ${mockNewWord.stems.join(', ')}`
    );

    cy.get('figcaption').contains(mockNewWord.imgDesc);
    cy.get('[data-cy="wordImg"]').should(
      'have.attr',
      'src',
      mockNewWord.imgUrl
    );
  });

  it('should save an offensive word with minimal data', () => {
    cy.get('[data-cy="wordForm"]').find('button[type="submit"]').click();

    cy.get('[data-cy="formField-name"] > p')
      .should('have.text', 'name value cannot be empty')
      .and('be.visible');

    cy.get('[data-cy="formField-particle"] > p')
      .should('contain', 'particle value cannot be empty')
      .and('be.visible');

    cy.get('[data-cy="defInput"] > p')
      .should('contain', 'definition value cannot be empty')
      .and('be.visible');

    cy.get('[data-cy="formField-shortDef"] > p')
      .should('contain', 'value cannot be empty')
      .and('be.visible');

    cy.get('[data-cy="formField-name"]').find('textarea').type(minNewWord.name);

    cy.get('[data-cy="formField-particle"]')
      .find('textarea')
      .type(minNewWord.particle);

    cy.get('[data-cy="formField-defs"]')
      .find('[data-cy="defInput"]')
      .find('textarea')
      // @ts-ignore
      .type(minNewWord.defs[0].def);

    cy.get('[data-cy="formField-defs"]')
      .find('[data-cy="exampleInput"]')
      .find('textarea')
      // @ts-ignore
      .type(minNewWord.defs[0].examples[0]);

    cy.get('[data-cy="wordForm"]')
      .find('[data-cy="checkbox"]')
      .contains('offensive')
      .click();

    cy.get('[data-cy="formField-shortDef"]')
      .find('textarea')
      .type(minNewWord.shortDef[0]);
    cy.get('[data-cy="wordForm"]').submit();

    cy.location().should('have.a.property', 'pathname', '/words');

    cy.get('[data-cy="notification-success"]')
      .as('notification')
      .should('be.visible');
    cy.get('@notification').find('h3').should('have.text', 'Word added');
    cy.get('@notification').contains(
      `${minNewWord.name} is added successfully`
    );

    cy.get('@notification').find('button').click();

    cy.get('[data-cy="wordCard"]')
      .find('h3')
      .should('have.text', minNewWord.name);

    cy.get('[data-cy="wordCard"]')
      .find('[data-cy="transcription"]')
      .contains(minNewWord.name);

    cy.get('[data-cy="wordCard"]')
      .find('[data-cy="offensive"]')
      .should('exist');

    cy.get('[data-cy="defsList"] li')
      .should('have.length', minNewWord.shortDef.length)
      .contains(minNewWord.shortDef[0]);

    cy.get('[data-cy="cardWrapper"]').click();

    cy.get('[data-cy="spinner"]').should('not.exist');

    cy.get('h3').should('have.text', minNewWord.name);

    cy.get('[data-cy="transcription"]').contains(minNewWord.name);

    cy.get('[data-cy="defsList"] li').should(
      'have.length',
      minNewWord.defs.length
    );

    cy.get('[data-cy="particle"]').should('have.text', minNewWord.particle);

    cy.get('[data-cy="defsList"] li')
      .first()
      .find('[data-cy="example"]')
      .should('have.length', 1)
      .contains(minNewWord.defs[0].examples[0]);

    cy.get('[data-cy="defsList"] li').contains(minNewWord.defs[0].def);
    cy.get('[data-cy="stems"]').contains(minNewWord.name);
  });
});
