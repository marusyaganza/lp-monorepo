import {
  NewWordInput,
  DefsInput,
  Word,
  UpdateWordInput
} from '../../../src/generated/graphql';

export function fillTextField(
  val: string,
  selector: string,
  inputSelector = 'textarea'
) {
  cy.get(selector).find(inputSelector).type(val);
}

export function fillArrayInput(values: string[], selector: string) {
  values.forEach((str, i) => {
    const isNotLast = i !== values.length - 1;
    cy.get(selector).find('textarea').last().as('currentSelector').type(str);
    if (isNotLast) {
      cy.get('@currentSelector')
        .parent()
        .find('[data-cy="button-plus"]')
        .click();
    }
  });
}

export function fillDefInput(val: DefsInput[], selector: string) {
  val.forEach((curr, i) => {
    const isNotLast = i !== val.length - 1;
    const { def, examples } = curr;
    cy.get(selector)
      .find(`[data-cy="definition-${i + 1}"]`)
      .as('currentEl')
      .find(`textarea[name="definition-${i + 1}"]`)
      .type(def);
    if (isNotLast) {
      cy.get('@currentEl')
        .find('[data-cy="button-plus"]')
        .contains('add definition')
        .click({ force: true });
    }
    examples?.forEach((e, j) => {
      const { text, translation } = e;

      cy.get('@currentEl')
        .find(`textarea[name="example-${j + 1}-text"]`)
        .last()
        .as('currentExample')
        .type(text);
      if (translation) {
        cy.get('@currentEl')
          .find(`textarea[name="example-${j + 1}-translation"]`)
          .last()
          .type(translation);
      }
      if (j !== examples.length - 1) {
        cy.get('@currentExample')
          .parent()
          .find('[data-cy="button-plus"]')
          .click();
      }
    });
  });
}

export function addDef(val: DefsInput[]) {
  val.forEach(v => {
    const { def, examples } = v;
    cy.getByCy('defInput')
      .last()
      .as('currentDef')
      .find('[data-cy="button-plus"]')
      .first()
      .click();
    cy.getByCy('defInput').last().find('textarea').first().type(def);
    if (examples?.length) {
      examples.forEach((ex, i) => {
        cy.get('@currentDef').parent().as('currentEl');
        const { text, translation } = ex;
        cy.findByCy('exampleInput', '@currentEl').last().type(text);
        if (translation) {
          cy.findByCy('exampleInput', '@currentEl').last().type(translation);
        }
        if (i !== examples.length - 1) {
          cy.findByCy('button-plus', '@currentEl').last().click();
        }
      });
    }
  });
}

export function checkDefInput(val: DefsInput[], selector: string) {
  val.forEach((curr, i) => {
    const { def, examples } = curr;
    cy.findByCy(`definition-${i + 1}`, selector)
      .as('currentEl')
      .find(`textarea[name="definition-${i + 1}"]`)
      .should('have.value', def);
    examples?.forEach((e, j) => {
      const { text, translation } = e;

      cy.get('@currentEl')
        .find(`textarea[name="example-${j + 1}-text"]`)
        .as('currentExample')
        .should('have.value', text);
      if (translation) {
        cy.get('@currentEl')
          .find(`textarea[name="example-${j + 1}-translation"]`)
          .should('have.value', translation);
      }
    });
  });
}

export function fillWordForm(wordInput: Partial<NewWordInput>) {
  const keys = Object.keys(wordInput);
  keys.forEach(key => {
    cy.getByCy(`formField-${key}`).as('field');
    const val = wordInput[key];
    const valueType = Array.isArray(val) ? 'array' : typeof val;

    switch (valueType) {
      case 'array':
        if (key === 'defs') {
          fillDefInput(val, '@field');
          break;
        }
        if (key === 'tags') {
          val.forEach(tag => {
            cy.findByCy('select-btn', '@field').click();
            cy.getByCy('selectOptions').contains(tag).click();
          });
          break;
        }
        fillArrayInput(val, '@field');
        break;
      case 'string':
        fillTextField(val, '@field');
        break;
      case 'boolean':
        cy.get('@field').find('input[type="checkbox"]').as('checkbox');
        if (val === true) {
          cy.get('@checkbox').check();
        }
    }
  });
}

export function editWord(wordInput: Partial<UpdateWordInput>) {
  const keys = Object.keys(wordInput);
  keys.forEach(key => {
    cy.getByCy(`formField-${key}`).as('field');
    const val = wordInput[key];
    const valueType = Array.isArray(val) ? 'array' : typeof val;

    switch (valueType) {
      case 'array':
        if (key === 'defs') {
          addDef(val);
          break;
        }
        if (key === 'tags') {
          val.forEach(tag => {
            cy.findByCy('select-btn', '@field').click();
            cy.getByCy('selectOptions').contains(tag).click();
          });
          break;
        }
        cy.findByCy('button-plus', '@field').click();
        fillArrayInput(val, '@field');
        break;
      case 'string':
        fillTextField(val, '@field');
        break;
      case 'boolean':
        cy.get('@field').find('input[type="checkbox"]').as('checkbox');
        if (val === true) {
          cy.get('@checkbox').check();
        }
    }
  });
}

export function checkInitialValues(wordInput: Partial<NewWordInput>) {
  const keys = Object.keys(wordInput);
  keys.forEach(key => {
    cy.getByCy(`formField-${key}`).as('field');
    const val = wordInput[key];
    const valueType = Array.isArray(val) ? 'array' : typeof val;

    switch (valueType) {
      case 'array':
        if (key === 'defs') {
          checkDefInput(val, '@field');
          break;
        }
        if (key === 'tags') {
          // TODO: add chech here
          break;
        }
        val.forEach((v, i) => {
          cy.get('@field').find('textarea').eq(i).should('have.value', v);
        });
        break;
      case 'string':
        if (key === 'name') {
          cy.get('@field').find('textarea').should('be.disabled');
        }
        cy.get('@field').find('textarea').should('have.value', val);
        break;
      case 'boolean':
        cy.get('@field').find('input[type="checkbox"]').as('checkbox');
        if (val === true) {
          cy.get('@checkbox').should('be.checked');
        } else {
          cy.get('@checkbox').should('not.be.checked');
        }
    }
  });
}
