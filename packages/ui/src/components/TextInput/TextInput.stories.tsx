import { TextInput } from './TextInput';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof TextInput> = {
  title: 'TextInput',
  component: TextInput,
  decorators: [styledPreviewDecorator()]
};

export const TextInputDefault = {};

export const TextInputError = {
  args: {
    variant: 'error',
    isDisabled: true,
    value: 'wrong'
  }
};

export const TextInputSuccess = {
  args: {
    variant: 'success',
    isDisabled: true,
    value: 'right'
  }
};

export default meta;
