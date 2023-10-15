/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />

import { existingWord } from '../support/mocks/mockData';

const inputData = {
  defs: [
    {
      def: '(of clothing) very large; having a lot of cloth',
      examples: [
        'a voluminous skirt',
        'From one of his voluminous pockets he produced a bottle of whisky.'
      ]
    }
  ]
};

describe('Words Page', () => {
  beforeEach(() => {
    cy.task('prepareDB');
    cy.login();
    cy.visit('/words');
    cy.get('[data-cy="sortControls"]').as('sortControls');
    cy.get('@sortControls').find('[data-cy="select"]').as('select');
    cy.get('[data-cy="headerNav"] a').as('headerLink');
    cy.intercept({
      method: 'GET',
      url: `${existingWord.audioUrl}`
    }).as('audioReq');
    cy.clock();
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });

  it('should render all the elements correctly', () => {
    cy.get('@headerLink').contains('Explore').click();

    cy.get('[data-cy="searchForm"]').find('input').type('voluminous');
    cy.get('[data-cy="searchForm"]').submit();
    cy.get('[data-cy="addButton"]').first().click();
    cy.get('form').find('[data-cy="clearButton"]').click();

    cy.get('[data-cy="searchForm"]').find('input').type('fowl');
    cy.get('[data-cy="searchForm"]').submit();
    cy.get('[data-cy="addButton"]').last().click();
    cy.get('[data-cy="addButton"]').first().click();

    cy.get('@headerLink').contains('Vocabulary').click();
    cy.get('[data-cy="wordCard"]').as('wordCard').should('have.length', 3);

    cy.get('[data-cy="cardWrapper"]').last().click();

    cy.get('[data-cy="editButton"]').click();

    cy.get('[data-cy="formField-name"]')
      .find('label > span')
      .should('have.text', 'name');

    cy.get('[data-cy="formField-name"]')
      .find('textarea')
      .should('be.disabled')
      .and('have.text', existingWord.name);

    cy.get('[data-cy="formField-particle"]')
      .find('label > span')
      .should('have.text', 'particle');

    cy.get('[data-cy="formField-particle"]')
      .find('textarea')
      .should('be.disabled')
      .and('have.text', existingWord.particle);

    cy.get('[data-cy="formField-defs"]')
      .as('defs')
      .find('[data-cy="defInput"]')
      .first()
      .as('firstDef')
      .find('label > span')
      .should('have.text', 'definition 1');

    cy.get('@firstDef')
      .find('textarea')
      .should('have.text', existingWord.defs[0].def);

    cy.get('@firstDef').find('label').contains('definition 1');
    cy.get('@firstDef')
      .find('textarea[name="definition"] + button[data-cy="button-minus"]')
      .should('be.enabled');

    cy.get('[data-cy="exampleInput"]')
      .first()
      .as('firstExample')
      .find('label > span')
      .should('have.text', 'example 1');

    cy.get('@firstExample')
      .find('[data-cy="button-plus"]')
      .should('be.enabled');

    cy.get('@firstExample')
      .find('textarea')
      // @ts-ignore
      .should('have.text', existingWord.defs[0].examples[0].text);

    cy.get('@defs')
      .find('[data-cy="defInput"]')
      .eq(1)
      .as('secondDef')
      .find('label > span')
      .should('have.text', 'definition 2');

    cy.get('@secondDef')
      .find('textarea')
      .should('have.text', existingWord.defs[1].def);

    cy.get('@secondDef')
      .find('button[data-cy="button-minus"]')
      .should('be.enabled');

    cy.get('@defs')
      .find('[data-cy="exampleInput"]')
      .eq(1)
      .as('secondExample')
      .find('label > span')
      .should('have.text', 'example 1');

    cy.get('@secondExample')
      .find('[data-cy="button-plus"]')
      .should('be.enabled');

    cy.get('@secondExample')
      .find('textarea')
      // @ts-ignore
      .should('have.text', existingWord.defs[1].examples[0].text);

    cy.get('@defs')
      .find('[data-cy="defInput"]')
      .eq(2)
      .as('lastDef')
      .find('label > span')
      .should('have.text', 'definition 3');

    cy.get('@lastDef')
      .find('textarea')
      .should('have.text', existingWord.defs[2].def);

    cy.get('@lastDef')
      .find('button[data-cy="button-plus"]')
      .should('be.enabled');

    cy.get('@defs')
      .find('[data-cy="exampleInput"]')
      .eq(2)
      .as('lastExample')
      .find('label > span')
      .should('have.text', 'example 1');

    cy.get('@lastExample').find('[data-cy="button-plus"]').should('be.enabled');

    cy.get('@lastExample')
      .find('textarea')
      // @ts-ignore
      .should('be.empty');

    /**short def */

    cy.get('[data-cy="formField-shortDef"]').should('have.length', 3);

    cy.get('[data-cy="formField-shortDef"]')
      .first()
      .as('shortDef1')
      .find('textarea')
      .should('have.text', existingWord.shortDef[0]);

    cy.get('@shortDef1').find('label').contains('short definition 1');

    cy.get('@shortDef1')
      .find('button[data-cy="button-minus"]')
      .should('be.enabled');

    cy.get('[data-cy="formField-shortDef"]')
      .eq(1)
      .as('shortDef2')
      .find('textarea')
      .should('have.text', existingWord.shortDef[1]);

    cy.get('@shortDef2').find('label').contains('short definition 2');

    cy.get('@shortDef2')
      .find('button[data-cy="button-minus"]')
      .should('be.enabled');

    cy.get('[data-cy="formField-shortDef"]')
      .last()
      .as('shortDef3')
      .find('textarea')
      .should('have.text', existingWord.shortDef[2]);

    cy.get('@shortDef3').find('label').contains('short definition 3');

    cy.get('@shortDef3')
      .find('button[data-cy="button-plus"]')
      .should('be.enabled');

    /**word forms*/

    cy.get('[data-cy="formField-stems"]').should(
      'have.length',
      existingWord.stems.length
    );

    cy.get('[data-cy="formField-stems"]')
      .first()
      .as('stem1')
      .find('textarea')
      .should('have.text', existingWord.stems[0]);

    cy.get('@stem1').find('label').contains('word form 1');

    cy.get('@stem1')
      .find('button[data-cy="button-minus"]')
      .should('be.enabled');

    cy.get('[data-cy="formField-stems"]')
      .eq(1)
      .as('stem2')
      .find('textarea')
      .should('have.text', existingWord.stems[1]);

    cy.get('@stem2').find('label').contains('word form 2');

    cy.get('@stem2')
      .find('button[data-cy="button-minus"]')
      .should('be.enabled');

    cy.get('[data-cy="formField-stems"]')
      .eq(2)
      .as('stem3')
      .find('textarea')
      .should('have.text', existingWord.stems[2]);

    cy.get('@stem3').find('label').contains('word form 3');

    cy.get('@stem3')
      .find('button[data-cy="button-minus"]')
      .should('be.enabled');

    cy.get('[data-cy="formField-stems"]')
      .eq(3)
      .as('stem4')
      .find('textarea')
      .should('have.text', existingWord.stems[3]);

    cy.get('@stem4').find('label').contains('word form 4');

    cy.get('@stem4').find('button[data-cy="button-plus"]').should('be.enabled');

    cy.get('[data-cy="formField-additionalInfo"]')
      .find('textarea')
      .should('be.empty');

    cy.get('[data-cy="formField-additionalInfo"]')
      .find('label > span')
      .should('have.text', 'Additional information');

    cy.get('[data-cy="wordForm"]')
      .find('[data-cy="select"]')
      .find('button')
      .should('have.text', 'B1 ');

    cy.get('[data-cy="formField-audioUrl"]')
      .find('label > span')
      .should('have.text', 'audio url');

    cy.get('[data-cy="formField-audioUrl"]')
      .find('textarea')
      .should('have.text', existingWord.audioUrl);

    cy.get('[data-cy="formField-transcription"]')
      .find('label > span')
      .should('have.text', 'transcription');

    cy.get('[data-cy="formField-transcription"]')
      .find('textarea')
      .should('have.text', existingWord.transcription);

    cy.get('[data-cy="formField-imgUrl"]')
      .find('label > span')
      .should('have.text', 'image url');

    cy.get('[data-cy="formField-imgUrl"]').find('textarea').should('be.empty');

    cy.get('[data-cy="formField-imgDesc"]').find('textarea').should('be.empty');

    cy.get('[data-cy="formField-imgDesc"]')
      .find('label > span')
      .should('have.text', 'image description');

    cy.get('[data-cy="wordForm"]')
      .find('[data-cy="checkbox"]')
      .contains('offensive');

    cy.get('[data-cy="wordForm"]')
      .find('button[type="submit"]')
      .should('have.text', 'Save');

    cy.get('[data-cy="wordForm"]').find('a').should('have.text', 'Cancel');

    cy.get('[data-cy="backLink"]').should('have.attr', 'href', '/words');
  });

  it('should be able to edit and save a word', () => {
    cy.get('@headerLink').contains('Explore').click();

    cy.get('[data-cy="searchForm"]').find('input').type('voluminous');
    cy.get('[data-cy="searchForm"]').submit();
    cy.get('[data-cy="addButton"]').first().click();
    cy.get('@headerLink').contains('Vocabulary').click();
    cy.get('[data-cy="cardWrapper"]').click();
    cy.get('[data-cy="editButton"]').click();

    cy.get('[data-cy="defInput"]')
      .eq(1)
      .find('[data-cy="button-minus"]')
      .click();

    cy.get('[data-cy="exampleInput"]')
      .find('[data-cy="button-plus"]')
      .first()
      .click();

    cy.get('[data-cy="exampleInput"]')
      .eq(1)
      .find('textarea')
      .should('be.empty')
      // @ts-ignore
      .type(existingWord.defs[0].examples[1].text);

    cy.get('[data-cy="exampleInput"]')
      .last()
      .find('textarea')
      .should('be.empty')
      // @ts-ignore
      .type(existingWord.defs[2].examples[0].text);

    cy.get('[data-cy="defInput"]')
      .last()
      .find('[data-cy="button-plus"]')
      .click();

    cy.get('[data-cy="defInput"]')
      .last()
      .find('textarea')
      .should('be.empty')
      .type(existingWord.defs[3].def);

    cy.get('[data-cy="exampleInput"]')
      .last()
      .find('textarea')
      .should('be.empty')
      // @ts-ignore
      .type(existingWord.defs[3].examples[0].text);

    cy.get('[data-cy="exampleInput"]')
      .last()
      .find('[data-cy="button-plus"]')
      .click();

    cy.get('[data-cy="exampleInput"]')
      .last()
      .find('textarea')
      .should('be.empty')
      // @ts-ignore
      .type(existingWord.defs[3].examples[1].text);

    cy.get('[data-cy="formField-shortDef"]')
      .find('[data-cy="button-plus"]')
      .click();

    cy.get('[data-cy="formField-shortDef"]')
      .last()
      .find('textarea')
      .type(existingWord.defs[3].def);

    cy.get('[data-cy="formField-additionalInfo"]')
      .find('textarea')
      .type('some additional info');

    cy.get('[data-cy="formField-imgUrl"]')
      .find('textarea')
      .type(existingWord.imgUrl);

    cy.get('[data-cy="formField-imgDesc"]')
      .find('textarea')
      .type(existingWord.imgDesc);

    cy.get('[data-cy="wordForm"]')
      .find('[data-cy="checkbox"]')
      .contains('offensive');

    cy.get('[data-cy="wordForm"]').find('button[type="submit"]').click();

    // /** Check that user was redirected on the words page and the notification is displayed */

    cy.location().should('have.a.property', 'pathname', '/words');

    cy.get('[data-cy="notification-success"]')
      .as('notification')
      .should('be.visible');
    cy.get('@notification').find('h3').should('have.text', 'Word updated');
    cy.get('@notification').contains(
      `Changes for the word ${existingWord.name} were saved`
    );
    cy.tick(5000);
    cy.get('[data-cy="notification-success"]').should('not.exist');

    cy.get('[data-cy="wordCard"]')
      .find('h3')
      .should('have.text', existingWord.name);

    cy.get('[data-cy="wordCard"]')
      .find('[data-cy="audioButton"]')
      .contains(existingWord.transcription);

    cy.get('[data-cy="wordCard"]').find('[data-cy="audioButton"]').click();
    cy.wait('@audioReq').then(interception => {
      assert.isNotNull(interception?.response?.body, 'audioURL call');
    });

    cy.get('[data-cy="defsList"] li').as('deflist').should('have.length', 4);
    cy.get('@deflist').each(($el, i) => {
      expect($el.text()).equal(existingWord.shortDef[i]);
    });

    cy.get('[data-cy="wordCard"]')
      .find('[data-cy="particle"]')
      .should('have.text', existingWord.particle);

    cy.get('[data-cy="wordCard"]')
      .find('[data-cy="level"]')
      .should('have.text', 'B1');

    cy.get('[data-cy="wordCard"]')
      .find('[data-cy="offensive"]')
      .should('not.exist');

    cy.get('[data-cy="cardWrapper"]').click();

    // /**validate the edited word on the word page */

    cy.get('[data-cy="spinner"]').should('not.exist');

    cy.get('h3').should('have.text', existingWord.name);

    cy.get('[data-cy="audioButton"]').contains(existingWord.transcription);

    cy.get('[data-cy="particle"]').should('have.text', existingWord.particle);

    cy.get('@deflist').should('have.length', 3);
    cy.get('[data-cy="level"]').should('have.text', 'B1');
    cy.get('@deflist')
      .first()
      .as('def1')
      .find('[data-cy="example"]')
      .should('have.length', 2);

    cy.get('@def1')
      .find('[data-cy="example"]')
      .first()
      .contains('trying to keep track of voluminous slips of paper');

    cy.get('@def1')
      .find('[data-cy="example"]')
      .last()
      .contains(
        'There is voluminous literature on modernism and post-modernism.'
      );

    cy.get('@def1').contains(existingWord.defs[0].def);

    cy.get('@deflist')
      .eq(1)
      .as('def2')
      .find('[data-cy="example"]')
      .should('have.length', 1);

    cy.get('@def2')
      .find('[data-cy="example"]')
      .first()
      .contains('I sank down into a voluminous armchair.');

    cy.get('@def2').contains(existingWord.defs[2].def);

    cy.get('@deflist')
      .last()
      .as('def3')
      .find('[data-cy="example"]')
      .should('have.length', 2);

    cy.get('@def3')
      .find('[data-cy="example"]')
      .first()
      .contains(existingWord.defs[3].examples[0].text);

    cy.get('@def3')
      .find('[data-cy="example"]')
      .last()
      .contains(existingWord.defs[3].examples[1].text);

    cy.get('@def3').contains(existingWord.defs[3].def);

    cy.get('[data-cy="stems"]').contains(
      `Word forms: ${existingWord.stems.join(', ')}`
    );

    cy.get('figcaption').contains(existingWord.imgDesc);
    cy.get('[data-cy="wordImg"]').should(
      'have.attr',
      'src',
      existingWord.imgUrl
    );
  });
});
