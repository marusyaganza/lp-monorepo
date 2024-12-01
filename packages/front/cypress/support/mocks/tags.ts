import { Language } from '../../../src/generated/graphql';

export const tags = {
  [Language.English]: [
    {
      text: 'Tag1',
      desc: 'Tag1 description',
      color: '#f0f0f0',
      language: Language.English
    },
    {
      text: 'Tag3',
      color: '#c0c0c0',
      language: Language.English
    },
    {
      text: 'Tag2',
      color: '#828282',
      language: Language.English
    }
  ],
  [Language.Spanish]: [
    {
      text: 'Etiqueta2',
      color: '#FF69B4', // hot pink
      language: Language.Spanish
    },
    {
      text: 'Etiqueta3',
      color: '#DB7093', // pale violet red
      language: Language.Spanish
    },
    {
      text: 'Etiqueta1',
      desc: 'Descripción de Etiqueta1',
      color: '#FFC0CB', // light pink
      language: Language.Spanish
    }
  ]
};
