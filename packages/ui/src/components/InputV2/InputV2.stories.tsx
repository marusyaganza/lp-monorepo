import { InputV2 } from './InputV2';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof InputV2> = {
  title: 'inputs/InputV2',
  component: InputV2,
  decorators: [styledPreviewDecorator()]
};

export const InputV2Default = {};

export const InputV2Error = {
  args: {
    errorText: 'Input cannot be empty'
  }
};

export default meta;
