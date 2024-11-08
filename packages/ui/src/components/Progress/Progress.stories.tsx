import { Progress } from './Progress';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Progress> = {
  title: 'game/Progress',
  component: Progress,
  decorators: [styledPreviewDecorator()]
};

export const ProgressDefault = {
  args: {
    value: 30
  }
};

export default meta;
