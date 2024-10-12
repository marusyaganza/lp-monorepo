import { Language } from '../../../generated/graphql';

export const newTagInputs = {
  [Language.English]: [
    {
      text: 'Tag1',
      desc: 'Tag1 description',
      color: '#f0f0f0',
      language: Language.English
    },
    {
      text: 'Tag2',
      color: '#fffff',
      language: Language.English
    },
    {
      text: 'Tag3',
      color: '#c0c0c0',
      language: Language.English
    }
  ],
  [Language.Spanish]: [
    {
      text: 'Tag1',
      desc: 'Tag1 description',
      color: '#f0f0f0',
      language: Language.Spanish
    },
    {
      text: 'Tag2',
      color: '#fffff',
      language: Language.Spanish
    },
    {
      text: 'Tag3',
      color: '#c0c0c0',
      language: Language.Spanish
    }
  ]
};
