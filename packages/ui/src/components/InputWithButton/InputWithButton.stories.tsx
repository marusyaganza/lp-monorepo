import { InputWithButton } from './InputWithButton';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof InputWithButton> = {
  title: 'InputWithButton',
  component: InputWithButton,
  decorators: [styledPreviewDecorator()]
};

export const InputWithButtonDefault = {};

export const InputWithButtonError = {
  args: {
    errorText: 'Input cannot be empty'
  }
};

export default meta;
