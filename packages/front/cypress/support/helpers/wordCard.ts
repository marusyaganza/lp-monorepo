/* eslint-disable jest/expect-expect */
/// <reference types="Cypress" />
import { NewWordInput } from '../../../src/generated/graphql';

export function checkWordCard(
  word: Partial<NewWordInput>,
  selector: string,
  variant = 'short'
) {
  const {
    shortDef,
    name,
    particle,
    audioUrl,
    transcription,
    defs,
    isOffensive,
    isLearned,
    imgUrl,
    imgDesc,
    stems,
    tags
  } = word;
  if (shortDef?.length && variant === 'short') {
    cy.findByCy('shortDef', selector).as('shortDef');
    shortDef.forEach((text, i) => {
      cy.get('@shortDef').find('li').eq(i).contains(text);
    });
  }
  if (name) {
    cy.findByCy('name', selector).contains(name);
  }
  if (particle) {
    cy.findByCy('particle', selector).contains(particle);
  }
  if (transcription) {
    if (audioUrl) {
      cy.findByCy('audioButton', selector).contains(transcription);
    } else {
      cy.findByCy('transcription', selector).contains(transcription);
    }
  }

  if (!audioUrl) {
    cy.findByCy('audioButton', selector).should('not.exist');
  }

  if (isOffensive === true) {
    cy.findByCy('isOffensive', selector)
      .should('be.visible')
      .contains('offensive');
  } else {
    cy.findByCy('isOffensive', selector).should('not.exist');
  }

  if (isLearned === true) {
    cy.findByCy('isLearned', selector).should('be.visible').contains('Learned');
  } else {
    cy.findByCy('isLearned', selector).should('not.exist');
  }

  if (tags?.length) {
    cy.findByCy('tags', selector).as('tags');
    tags.forEach((text, i) => {
      cy.get('@tags').find('li').eq(i).contains(text);
    });
  }

  if (variant === 'full') {
    if (defs?.length) {
      cy.get(selector).find('[data-cy="defs"] > li').as('defs');
      defs.forEach((curr, i) => {
        const { def, examples } = curr;
        cy.get('@defs').eq(i).as('currentDef').contains(def);
        if (examples?.length) {
          cy.get('@currentDef').find('[data-cy="examples"]').as('examples');
          examples?.forEach(({ text, translation }, j) => {
            cy.get('@examples')
              .find('p')
              .eq(j)
              .contains(text.replace('<i>', '').replace('</i>', ''));
            if (translation) {
              cy.get('@examples').find('p').eq(j).contains(translation);
            }
          });
        }
      });
    }
    if (imgUrl) {
      cy.findByCy('imgUrl', selector).should('have.attr', 'src', imgUrl);
    }
    if (imgDesc) {
      cy.findByCy('imgDesc', selector).contains(
        imgDesc.replaceAll('<i>', '').replaceAll('</i>', '')
      );
    }
    if (stems?.length) {
      cy.findByCy('stems', selector).contains(
        `Word forms: ${stems.join(', ')}`
      );
    }
  }
}
