import { ColorInput } from './ColorInput';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ColorInput> = {
  title: 'ColorInput',
  component: ColorInput,
  decorators: [styledPreviewDecorator()]
};

export const ColorInputDefault = {
  args: {
    label: 'color',
    name: 'color'
  }
};

export const ColorInputWithInitialValue = {
  args: {
    initialValue: '#FDA50F',
    label: 'color',
    name: 'color'
  }
};

export default meta;
