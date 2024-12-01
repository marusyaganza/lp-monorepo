/* eslint-disable jest/expect-expect */

import { Language, WordTagInput } from '../../src/generated/graphql';
import { HEADER_TEXTS, TEXTS_BY_PAGE } from '../support/constants';
import { tags } from '../support/mocks/tags';

const languages = Object.values(Language);

const words = {
  [Language.English]: ['voluminous', 'wheel'],
  [Language.Spanish]: ['hola', 'idioma']
};

const newTag = {
  [Language.English]: {
    text: 'Tag4',
    color: '0a67b0',
    desc: 'Tag4 description'
  },
  [Language.Spanish]: {
    text: 'Etiqueta4',
    desc: 'Descripción de Etiqueta4',
    color: 'ee7777'
  }
};

function checkTag(tag: Omit<WordTagInput, 'language'>) {
  const { text, desc } = tag;
  cy.getByCy(`tag-${text}`).as('currentTag');
  cy.findByCy('tag', '@currentTag').should('contain', `#${text}`);
  if (desc) {
    cy.findByCy('tag-desc', '@currentTag').should('contain', desc);
  }
  cy.findByCy('delete-btn', '@currentTag')
    .should('contain', 'Delete')
    .and('be.enabled');

  cy.findByCy('edit-btn', '@currentTag')
    .should('contain', 'Edit')
    .and('be.enabled');
}

function checkEditTagForm(tag: WordTagInput) {
  const { text, desc, color } = tag;
  cy.getByCy(`tag-${text}`).as('currentTag');
  cy.findByCy('edit-btn', '@currentTag').click();

  cy.getByCy('tags-form')
    .find('textarea[name="text"]')
    .should('have.value', text);
  cy.getByCy('tags-form')
    .find('input[name="color"]')
    .should('have.value', color);
  cy.getByCy('tags-form')
    .find('input[type="color"]')
    .should('have.value', color.toLowerCase());
  cy.getByCy('tags-form')
    .find('textarea[name="desc"]')
    .should('have.value', desc || '');

  cy.getByCy('tags-form')
    .find('button[type="submit"]')
    .should('contain.text', 'Save')
    .and('be.enabled');

  cy.getByCy('cancel-btn').should('contain', 'Cancel').click();

  cy.getByCy('tags-form').should('not.exist');
}

describe('Tags Page', () => {
  beforeEach(() => {
    cy.task('prepareDB', {
      tags: [...tags[Language.English], ...tags[Language.Spanish]]
    });
    cy.login();
    cy.visit('/tags');
    cy.getByCy('headerNav').as('headerLink');
  });

  afterEach(() => {
    cy.task('disconnectFromDb');
  });

  it('should render page correctly', () => {
    cy.get('h1').should('contain', TEXTS_BY_PAGE.tags.mainHeading);

    cy.getByCy('new-tag-btn')
      .should('be.enabled')
      .and('contain', TEXTS_BY_PAGE.tags.newTagBtn)
      .click();

    cy.getByCy('tags-form').as('newTagForm').should('be.visible');

    cy.findByCy('text', '@newTagForm').find('label').should('contain', 'text');
    cy.findByCy('text', '@newTagForm').find('textarea').should('be.empty');

    cy.findByCy('desc', '@newTagForm').find('label').should('contain', 'desc');
    cy.findByCy('desc', '@newTagForm').find('textarea').should('be.empty');

    cy.findByCy('color', '@newTagForm')
      .find('label')
      .should('contain', 'color');
    cy.findByCy('color', '@newTagForm').find('input').should('be.empty');
    cy.findByCy('color', '@newTagForm')
      .find('input[type="color"]')
      .should('be.empty');
    cy.findByCy('color', '@newTagForm')
      .find('input[type=color]')
      .invoke('val', '#ff0000')
      .trigger('change');

    // TODO: test color inputs interaction
    // cy.findByCy('color', '@newTagForm')
    //   .find('input[name="color"]')
    //   .should('have.value', '#ff0000');

    cy.get('@newTagForm')
      .find('button[type="submit"]')
      .should('contain.text', 'Save')
      .and('be.enabled');

    cy.findByCy('cancel-btn', '@newTagForm')
      .should('contain', 'Cancel')
      .click();

    cy.get('@newTagForm').should('not.exist');
    // TODO: test form validation
  });

  languages.forEach(lang => {
    it(`should render existing tags correctly with ${lang} language`, () => {
      cy.changeLanguage(lang);
      tags[lang].forEach(tag => {
        checkTag(tag);
        checkEditTagForm(tag);
      });
    });

    it(`should edit existing tags correctly with ${lang} language`, () => {
      cy.changeLanguage(lang);
      const tag = tags[lang][1];
      const tagUpdate = {
        desc: `Detailed description of the ${tag.text}`,
        color: 'e2901d'
      };
      cy.getByCy(`tag-${tag.text}`).as('tagToEdit');
      cy.findByCy('edit-btn', '@tagToEdit').click();
      cy.getByCy('tags-form').as('editForm');
      cy.findByCy('desc', '@editForm').find('textarea').type(tagUpdate.desc);
      cy.findByCy('color', '@editForm')
        .find('input')
        .first()
        .clear()
        .type(tagUpdate.color);
      cy.get('@editForm').find('button').contains('Save').click();
      cy.get('@editForm').should('not.exist');
      checkTag({ ...tag, ...tagUpdate });
    });

    it(`should add tag correctly with ${lang} language`, () => {
      cy.changeLanguage(lang);

      const tagInput = newTag[lang];

      cy.getByCy('new-tag-btn').click();

      cy.getByCy('tags-form')
        .as('newTagForm')
        .find('textarea[name="text"]')
        .type(tagInput.text);
      cy.getByCy('tags-form')
        .as('newTagForm')
        .find('textarea[name="desc"]')
        .type(tagInput.desc);
      cy.getByCy('tags-form').find('input[name="color"]').type(tagInput.color);

      cy.getByCy('tags-form').submit();
      cy.getByCy('tags-form').should('not.exist');

      checkTag(tagInput);

      // Checking tag selectors

      cy.get('@headerLink').contains(HEADER_TEXTS.practice).click();
      cy.getByCy('tag-selector').as('tagSelector');
      cy.findByCy('select-btn', '@tagSelector').click();
      cy.findByCy('selectOptions', '@tagSelector').contains(tagInput.text);

      cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
      cy.getByCy('tag-selector').as('tagSelector');
      cy.findByCy('select-btn', '@tagSelector').click();
      cy.findByCy('selectOptions', '@tagSelector').contains(tagInput.text);

      cy.getByCy('add-word-link').click();
      cy.getByCy('formField-tags').as('tagField');
      cy.findByCy('select-btn', '@tagField').click();
      cy.getByCy('selectOptions').contains(tagInput.text);
      // TODO: check edit word form's tag selector
    });

    it(`should delete tags correctly with ${lang} language`, () => {
      cy.changeLanguage(lang);
      words[lang].forEach(word => {
        cy.addWord(word);
      });

      const wordWithTag = words[lang][1];
      const tagToDelete = tags[lang][1].text;

      // prep phase: adding words with tags
      cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
      cy.getByCy(`wordcard-${wordWithTag}`).click();
      cy.getByCy('editButton').click();
      cy.editWord({ tags: [tagToDelete] });
      cy.getByCy('wordForm').submit();

      cy.getByCy('wordCard').first().as('wordCard');
      cy.findByCy('tags', '@wordCard').contains(tagToDelete);

      cy.get('@headerLink').contains(HEADER_TEXTS.tags).click();

      // delete tag but cancel
      cy.getByCy(`tag-${tagToDelete}`).as('tagToDelete');
      cy.findByCy('delete-btn', '@tagToDelete').click();
      cy.getByCy('modal')
        .as('modal')
        .should('be.visible')
        .contains(`Are you sure you want to delete the tag ${tagToDelete}`);
      cy.findByCy('no-btn', '@modal').contains('Cancel').click();
      cy.get('@modal').should('not.be.visible');
      cy.get('@tagToDelete').should('be.visible');

      // delete tag
      cy.findByCy('delete-btn', '@tagToDelete').click();
      cy.findByCy('yes-btn', '@modal').contains('Delete').click();
      cy.get('@modal').should('not.be.visible');
      cy.get('@tagToDelete').should('not.exist');
      cy.get('@headerLink').contains(HEADER_TEXTS.vocabulary).click();
      // make sure the tag was deleted from the word
      cy.findByCy('tags', '@wordCard').should('not.contain', tagToDelete);

      //TODO: test deleting a tag and make sure it was removed correctly from a word that has multiple tags
    });
  });
});
