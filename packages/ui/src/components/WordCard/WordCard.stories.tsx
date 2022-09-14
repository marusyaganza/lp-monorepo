import React from 'react';
import { addDecorator } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import { WordCard } from './WordCard';

addDecorator(story => (
  <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
));

export default {
  title: 'WordCard',
  component: WordCard
};

const word = {
  uuid: '74046e79-e4c9-4b52-ac96-cb7ae98fb601',
  id: 'mockid',
  name: 'shoal',
  imgUrl: 'https://image.adsoftheworld.com/k1fnqumahtfbzucobwcona3uck8n',
  defs: [
    '{bc} a large group or number',
    '{bc} an area where the water in a sea, lake, or river is not deep',
    '{bc} a small, raised area of sand just below the surface of the water'
  ],
  particle: 'noun',
  examples: ['Example1', 'Example2'],
  audioUrl:
    'https://www.oxfordlearnersdictionaries.com/media/english/uk_pron/e/ega/egali/egalitarian__gb_1.mp3',
  transcription: 'iˌɡælɪˈteəriən',
  // transcription: 'ˈʃoʊl',
  // audioUrl: 'https://media.merriam-webster.com/soundc11/s/shoal001.wav',
  user: '0'
};

export const WordCardComponent = () => <WordCard word={word} />;
