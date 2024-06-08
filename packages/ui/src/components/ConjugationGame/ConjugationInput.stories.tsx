import { ConjugationInput } from './ConjugationInput';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ConjugationInput> = {
  title: 'ConjugationInput',
  component: ConjugationInput,
  decorators: [styledPreviewDecorator()]
};

export const ConjugationInputDefault = {
  args: {
    prop: 'prop text'
  }
};

export default meta;
