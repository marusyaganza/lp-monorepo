import { Input } from './Input';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  decorators: [styledPreviewDecorator()]
};

const args = {
  name: 'text',
  label: 'Text input',
  errorText: 'Text is required'
};

export const DefaultInput = {
  args
};

export const InputDisabled = {
  args: {
    ...args,
    disabled: true
  }
};

export const PasswordInput = {
  args: {
    ...args,
    type: 'password'
  }
};

export const PasswordInputDisabled = {
  args: {
    ...args,
    type: 'password',
    disabled: true
  }
};

export default meta;
