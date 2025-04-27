import { SpeechInput } from './SpeechInput';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof SpeechInput> = {
  title: 'inputs/SpeechInput',
  component: SpeechInput,
  decorators: [styledPreviewDecorator()]
};

export const SpeechInputDefault = {
  args: {
    prop: 'prop text'
  }
};

export default meta;
