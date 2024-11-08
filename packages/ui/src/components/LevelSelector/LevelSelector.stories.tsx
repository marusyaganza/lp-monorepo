import { Level } from '../../generated/graphql';
import { LevelSelector } from './LevelSelector';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof LevelSelector> = {
  title: 'inputs/LevelSelector',
  component: LevelSelector,
  decorators: [styledPreviewDecorator()]
};

export const LevelSelectorDefault = {
  args: {
    initialValue: Level.B1
  }
};

export default meta;
