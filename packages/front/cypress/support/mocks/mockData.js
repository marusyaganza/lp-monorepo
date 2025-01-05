export const mockUser = {
  email: 'test@test.com',
  password: '$2a$10$BWXVWTiZqETNfnD.VmA4BeQkCEICXsl8hXLVBKq0.fxANC.ARWLt6',
  firstName: 'Test',
  lastName: 'User1',
  role: 'MEMBER',
  createdAt: '1695718253064',
  primaryLanguage: ''
};

export const mockWord = {
  particle: 'noun',
  language: 'ENGLISH',
  name: 'rubber',
  level: 'B2',
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
};

export const mockNewWord = {
  name: 'appliance',
  defs: [
    {
      def: 'a machine that is designed to do a particular thing in the home, such as preparing food, heating or cleaning',
      examples: [
        { text: 'electrical/household appliances' },
        { text: 'modern heating appliances of all types' }
      ]
    },
    {
      def: 'information appliance',
      examples: [
        {
          text: 'A growing number of companies are coming up with ways [in 2000] to turn ordinary phones into Internet appliances.'
        },
        {
          text: 'They sell a wide range of domestic appliances—washing machines, dishwashers and so on.'
        }
      ]
    },
    {
      def: 'compliance'
    }
  ],
  particle: 'noun',
  imgUrl:
    'https://www.oxfordlearnersdictionaries.com/media/english/fullsize/k/kit/kitch/kitchen_appliances.png',
  imgDesc: 'kitchen appliences',
  audioUrl:
    'https://media.merriam-webster.com/audio/prons/en/us/mp3/a/applia01.mp3',
  additionalInfo: 'This is very important word',
  transcription: 'ə-ˈplī-ən(t)s',
  isOffensive: false,
  stems: ['appliance', 'appliances'],
  shortDef: [
    'a machine that is designed to do a particular thing in the home, such as preparing food, heating or cleaning',
    'a piece of equipment for adapting a tool or machine to a special purpose : attachment',
    'an instrument or device designed for a particular use or function; specifically : a household or office device (such as a stove, fan, or refrigerator) operated by gas or electric current'
  ]
};

export const minNewWord = {
  name: 'fall short',
  particle: 'phrase',
  defs: [
    {
      def: 'to fail to reach the standard that you expected or need',
      examples: [{ text: "Taylor's solution falls short of the mark." }]
    }
  ],
  shortDef: ['to fail to meet expectations']
};

export const existingWord = {
  transcription: 'və-ˈlü-mə-nəs',
  stems: ['voluminous', 'voluminously', 'voluminousness', 'voluminousnesses'],
  particle: 'adjective',
  name: 'voluminous',
  isOffensive: false,
  defs: [
    {
      examples: [
        {
          text: 'trying to keep track of <i>voluminous</i> slips of paper',
          translation: null
        },
        {
          text: 'There is voluminous literature on modernism and post-modernism.'
        }
      ],
      def: 'numerous'
    },
    {
      examples: [
        {
          text: 'a <i>voluminous</i> correspondent',
          translation: null
        }
      ],
      def: 'writing or speaking much or at great length'
    },
    {
      def: 'consisting of many folds, coils, or convolutions winding',
      examples: [{ text: 'I sank down into a voluminous armchair.' }]
    },
    {
      def: '(of clothing) very large; having a lot of cloth',
      examples: [
        {
          text: 'a voluminous skirt'
        },
        {
          text: 'From one of his voluminous pockets he produced a bottle of whisky.'
        }
      ]
    }
  ],
  audioUrl:
    'https://media.merriam-webster.com/audio/prons/en/us/mp3/v/volumi02.mp3',
  shortDef: [
    'having or marked by great volume or bulk : large; also : full',
    'numerous',
    'filling or capable of filling a large volume or several volumes',
    '(of clothing) very large; having a lot of cloth'
  ],
  language: 'ENGLISH',
  imgDesc: 'new image description',
  imgUrl: 'mockImgUrl'
};
