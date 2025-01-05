import { VerbSelector } from './VerbSelector';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof VerbSelector> = {
  title: 'Inputs/VerbSelector',
  component: VerbSelector
};

const options = [
  {
    id: '1',
    name: 'acabar'
  },
  {
    id: '2',
    name: 'comer'
  },
  {
    id: '3',
    name: 'mudar'
  },
  {
    id: '4',
    name: 'recoger'
  },
  {
    id: '5',
    name: 'ser'
  },
  {
    id: '6',
    name: 'tener'
  },
  {
    id: '7',
    name: 'volver'
  }
];

export const VerbSelectorDefault = {
  args: {
    options
  }
};

export default meta;
