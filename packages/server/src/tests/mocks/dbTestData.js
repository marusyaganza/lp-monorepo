import { Language, Level } from '../../generated/graphql';

export const testData = {
  createUserInput: {
    email: 'test@test.com',
    password: 'password1',
    firstName: 'Test',
    lastName: 'User1',
    primaryLanguage: 'English',
    role: 'MEMBER'
  },
  createUserInput2: {
    email: 'test2@test.com',
    password: 'password2',
    firstName: 'Test',
    lastName: 'User2',
    primaryLanguage: 'Spanish',
    role: 'MEMBER'
  },
  updateUserInput: {
    firstName: 'Test3',
    primaryLanguage: 'French'
  },
  createWordInput: {
    uuid: '74046e79-e4c9-4b52-ac96-cb7ae98fb601',
    name: 'egalitarian',
    isOffensive: false,
    shortDef: ['aiming for equal wealth, status, etc., for all people'],
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
    language: Language.English,
    level: Level.C1,
    stems: ['egalitarian', 'egalitarianism', 'egalitarians'],
    audioUrl: 'mock.mp3',
    transcription: 'iˌɡælɪˈteəriən',
    imgUrl: 'mock.jpeg',
    additionalInfo: 'additional info'
  },
  createWordInput2: {
    particle: 'noun',
    language: Language.English,
    name: 'rubber',
    level: Level.B2,
    shortDef: [
      'a thin, flexible loop that is made of rubber and used to hold things together \u2014called also (US) elastic, elastic band'
    ],
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
  },
  updateWordInput: {
    additionalInfo: 'very useful information',
    audioUrl: 'mock.mp3',
    level: Level.B2,
    defs: [
      {
        def: '{bc} a strong substance that stretches and that is made out of chemicals or from the juice of a tropical tree',
        examples: [{ text: 'a rubber plantation' }, { text: 'a rubber tree' }]
      },
      {
        def: '{b}{it}rubbers{/it}{/b} {it}US{/it}, {it}informal + old-fashioned{/it} {bc} shoes or boots that are made of rubber and that fit over your regular shoes to keep them dry'
      }
    ],
    imgUrl: 'mock.jpeg'
  },
  updateWordInput2: {
    additionalInfo: 'very important information',
    audioUrl: 'mock.mp3',
    level: Level.B2,
    name: 'rubber1',
    uuid: 'invaliduuid'
  },
  createTagInput: {
    text: 'Tag text',
    desc: 'Tag description',
    color: '#f0f0f0',
    language: Language.English
  },
  createTagInput2: {
    text: 'Tag2 text',
    desc: 'Tag2 description',
    color: '#f2f2f2',
    language: Language.English
  },
  updateTagInput: {
    text: 'Updated Tag text',
    desc: 'Tag description was updated',
    color: '#f0f0f1'
  }
};
