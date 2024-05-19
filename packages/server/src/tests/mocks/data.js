import { Language, Role } from '../../generated/graphql';

export const words = [
  {
    uuid: '74046e79-e4c9-4b52-ac96-cb7ae98fb601',
    id: 'mockid',
    name: 'egalitarian',
    isOffensive: false,
    defs: [
      {
        def: 'a person who believes that everyone is equal and should have the same rights and opportunities',
        examples: [
          { text: 'He described himself as ‘an {it}egalitarian{/it}’.' }
        ]
      },
      {
        def: 'aiming for equal wealth, status, etc., for all people',
        examples: [
          { text: 'He is a committed {it}egalitarian{/it}' },
          {
            text: 'Even in the {it}egalitarian{/it} Nordic country, Marin felt hergender and age sometimes received too much emphasis. Kostya Manenkov And Karl Ritter, USA TODAY, 21 Aug. 2022'
          }
        ]
      }
    ],
    particle: 'noun',
    level: 'C1',
    stems: ['egalitarian', 'egalitarianism', 'egalitarians'],
    audioUrl:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/e/ega/egali/egalitarian__gb_1.mp3',
    transcription: 'iˌɡælɪˈteəriən',
    shortdef: ['aiming for equal wealth, status, etc., for all people'],
    user: '1'
  }
];

export const users = [
  {
    email: 'member@member.com',
    password: 'password',
    role: 'MEMBER',
    createdAt: 1571213104370,
    id: '1',
    firstName: 'User',
    lastName: 'Test'
  }
];

export const user = { id: '1', role: Role.Member };

export const dbUsers = [
  {
    email: 'member@member.com',
    password: 'password',
    role: 'MEMBER',
    createdAt: 1571213104370,
    _id: '63fe782ee6b6423093c312d4',
    firstName: 'User',
    lastName: 'Test'
  },
  {
    email: 'admin@admin.com',
    password: 'password2',
    role: 'ADMIN',
    createdAt: 1571213104371,
    _id: '63fe782ee6b6423093c312d5',
    firstName: 'User2',
    lastName: 'Test2'
  }
];

export const dbWords = [
  {
    uuid: '74046e79-e4c9-4b52-ac96-cb7ae98fb601',
    _id: '63fe782ee6b6423093c312d6',
    name: 'egalitarian',
    isOffensive: false,
    defs: [
      {
        def: 'a person who believes that everyone is equal and should have the same rights and opportunities',
        examples: [
          { text: 'He described himself as ‘an {it}egalitarian{/it}’.' }
        ]
      },
      {
        def: 'aiming for equal wealth, status, etc., for all people',
        examples: [
          { text: 'He is a committed {it}egalitarian{/it}' },
          {
            text: 'Even in the {it}egalitarian{/it} Nordic country, Marin felt hergender and age sometimes received too much emphasis. Kostya Manenkov And Karl Ritter, USA TODAY, 21 Aug. 2022'
          }
        ]
      }
    ],
    particle: 'noun',
    level: 'C1',
    stems: ['egalitarian', 'egalitarianism', 'egalitarians'],
    audioUrl:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/e/ega/egali/egalitarian__gb_1.mp3',
    transcription: 'iˌɡælɪˈteəriən',
    shortdef: ['aiming for equal wealth, status, etc., for all people'],
    user: '63fe782ee6b6423093c312d4'
  },
  {
    user: '63fe782ee6b6423093c312d4',
    _id: '63fe782ee6b6423093c312d7',
    particle: 'noun',
    name: 'rubber',
    stems: ['rubber', 'rubbers', 'burn rubber'],
    uuid: '59e03286-73c9-43e6-b1eb-4407a6c06b1e',
    defs: [
      {
        def: '{bc} a strong substance that stretches and that is made out of chemicals or from the juice of a tropical tree'
      },
      {
        def: '{it}British{/it}'
      },
      {
        def: '{b}{it}rubbers{/it}{/b} {it}US{/it}, {it}informal + old-fashioned{/it} {bc} shoes or boots that are made of rubber and that fit over your regular shoes to keep them dry'
      }
    ]
  }
];

export const userCreateInput = {
  email: 'member@member.com',
  password: 'password',
  role: 'MEMBER',
  firstName: 'User',
  lastName: 'Test'
};

export const dictionaryWord = {
  uuid: '74046e79-e4c9-4b52-ac96-cb7ae98fb601',
  name: 'egalitarian',
  isOffensive: false,
  defs: [
    {
      def: 'a person who believes that everyone is equal and should have the same rights and opportunities',
      examples: [{ text: 'He described himself as ‘an {it}egalitarian{/it}’.' }]
    },
    {
      def: 'aiming for equal wealth, status, etc., for all people',
      examples: [
        { text: 'He is a committed {it}egalitarian{/it}' },
        {
          text: 'Even in the {it}egalitarian{/it} Nordic country, Marin felt hergender and age sometimes received too much emphasis. Kostya Manenkov And Karl Ritter, USA TODAY, 21 Aug. 2022'
        }
      ]
    }
  ],
  particle: 'noun',
  shortdef: ['aiming for equal wealth, status, etc., for all people'],
  stems: ['egalitarian', 'egalitarianism', 'egalitarians'],
  audioUrl:
    'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/e/ega/egali/egalitarian__gb_1.mp3',
  transcription: 'iˌɡælɪˈteəriən'
};

export const tags = [
  {
    text: 'Spanish Tag 1 text',
    desc: 'Tag 1 desc',
    id: 'tag1Id',
    color: '#d1af33',
    language: Language.Spanish
  },
  {
    text: 'English Tag 2 text',
    desc: 'Tag 2 desc',
    id: 'tag2Id',
    color: '#ee7777',
    language: Language.English
  }
];
