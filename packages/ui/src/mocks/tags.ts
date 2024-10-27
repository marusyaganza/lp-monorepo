import { Language } from '../generated/graphql';

export const tags = {
  [Language.English]: [
    {
      id: '1',
      text: 'Tag1',
      desc: 'Tag1 description',
      color: '#f0f0f0',
      language: Language.English
    },
    {
      id: '2',
      text: 'Tag2',
      color: '#fffff',
      language: Language.English
    },
    {
      id: '3',
      text: 'Tag3',
      color: '#c0c0c0',
      language: Language.English
    }
  ],
  [Language.Spanish]: [
    {
      id: '4',
      text: 'Tag1',
      desc: 'Tag1 description',
      color: '#f0f0f0',
      language: Language.Spanish
    },
    {
      id: '5',
      text: 'Tag2',
      color: '#fffff',
      language: Language.Spanish
    },
    {
      id: '6',
      text: 'Tag3',
      color: '#c0c0c0',
      language: Language.Spanish
    }
  ]
};
