import { WordType } from '@lp/types';
import egalitarianImg from './egalitarian.svg';

export const words: WordType[] = [
  {
    uuid: '74046e79-e4c9-4b52-ac96-cb7ae98fb601',
    id: 'mockid',
    name: 'egalitarian',
    imgUrl: egalitarianImg,
    isOffensive: false,
    defs: [
      {
        def: 'a person who believes that everyone is equal and should have the same rights and opportunities',
        examples: ['He described himself as ‘an {it}egalitarian{/it}’.']
      },
      {
        def: 'aiming for equal wealth, status, etc., for all people',
        examples: [
          'He is a committed {it}egalitarian{/it}',
          'Even in the {it}egalitarian{/it} Nordic country, Marin felt hergender and age sometimes received too much emphasis. Kostya Manenkov And Karl Ritter, USA TODAY, 21 Aug. 2022'
        ]
      }
    ],
    particle: 'noun',
    level: 'C1',
    stems: ['egalitarian', 'egalitarianism', 'egalitarians'],
    audioUrl:
      'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/e/ega/egali/egalitarian__gb_1.mp3',
    transcription: 'iˌɡælɪˈteəriən',
    user: '0'
  },
  {
    uuid: '74046e79-e4c9-4b52-ac96-cb7ae98fb601',
    id: 'mockid',
    name: 'pussy',
    isOffensive: true,
    defs: [
      {
        def: '{it}informal + offensive{/it} {bc} a woman\u0027s sex organs {it}also{/it} {bc} sexual intercourse with a woman'
      }
    ],
    particle: 'noun',
    level: 'C2',
    stems: ['pussy', 'pussies'],
    transcription: '\u02c8p\u028asi',
    user: '0'
  }
];
