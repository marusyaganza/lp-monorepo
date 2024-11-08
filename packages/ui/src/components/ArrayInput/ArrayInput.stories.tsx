import { ArrayInput, ArrayInputProps } from './ArrayInput';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ArrayInput> = {
  title: 'inputs/ArrayInput',
  component: ArrayInput,
  decorators: [styledPreviewDecorator()]
};

type Story = StoryObj<typeof ArrayInput>;

const defaultArgs: Partial<ArrayInputProps> = {
  label: 'Default label',
  variant: 'dark'
};

export const ArrayInputDefault: Story = { args: defaultArgs };

export const ArrayInputWithOrderControls: Story = {
  args: { ...defaultArgs, showOrderButtons: true }
};

export default meta;
