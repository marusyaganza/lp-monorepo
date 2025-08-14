/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import {
  getByCy,
  checkNotification,
  checkPathName,
  findByCy,
  login,
  changeLanguage,
  checkReq,
  selectOption,
  presetLanguage
} from './helpers/general';
import {
  checkInitialValues,
  editWord,
  fillArrayInput,
  fillDefInput,
  fillTextField,
  fillWordForm
} from './helpers/wordForm';

import { checkWordCard } from './helpers/wordCard';
import { addWord } from './helpers/word';

declare global {
  namespace Cypress {
    interface Chainable {
      login: typeof login;
      fillTextField: typeof fillTextField;
      fillDefInput: typeof fillDefInput;
      fillArrayInput: typeof fillArrayInput;
      fillWordForm: typeof fillWordForm;
      getByCy: typeof getByCy;
      checkNotification: typeof checkNotification;
      checkPathName: typeof checkPathName;
      checkWordCard: typeof checkWordCard;
      findByCy: typeof findByCy;
      changeLanguage: typeof changeLanguage;
      addWord: typeof addWord;
      checkWordForm: typeof checkInitialValues;
      checkReq: typeof checkReq;
      editWord: typeof editWord;
      selectOption: typeof selectOption;
      presetLanguage: typeof presetLanguage;
    }
  }
}

Cypress.Commands.add('login', login);
Cypress.Commands.add('fillTextField', fillTextField);
Cypress.Commands.add('fillDefInput', fillDefInput);
Cypress.Commands.add('fillArrayInput', fillArrayInput);
Cypress.Commands.add('fillWordForm', fillWordForm);
Cypress.Commands.add('getByCy', getByCy);
Cypress.Commands.add('checkNotification', checkNotification);
Cypress.Commands.add('checkPathName', checkPathName);
Cypress.Commands.add('checkWordCard', checkWordCard);
Cypress.Commands.add('findByCy', findByCy);
Cypress.Commands.add('changeLanguage', changeLanguage);
Cypress.Commands.add('addWord', addWord);
Cypress.Commands.add('checkWordForm', checkInitialValues);
Cypress.Commands.add('checkReq', checkReq);
Cypress.Commands.add('editWord', editWord);
Cypress.Commands.add('selectOption', selectOption);
Cypress.Commands.add('presetLanguage', presetLanguage);

Cypress.on('uncaught:exception', err => {
  console.error('err', err.message);
  return false;
});
