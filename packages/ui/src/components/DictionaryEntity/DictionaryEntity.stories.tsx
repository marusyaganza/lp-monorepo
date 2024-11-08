import { DictionaryEntity } from './DictionaryEntity';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof DictionaryEntity> = {
  title: 'general/DictionaryEntity',
  component: DictionaryEntity,
  decorators: [styledPreviewDecorator()]
};

export const DictionaryEntityDefault = {
  args: {
    text: 'prop text <i>with highlight</i>'
  }
};

export default meta;
