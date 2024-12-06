import { Tag } from './Tag';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Tag> = {
  title: 'general/Tag',
  component: Tag,
  decorators: [styledPreviewDecorator()]
};

export const TagDefault = {
  args: {
    text: 'tag text',
    color: '#BFB3E7'
  }
};

export default meta;
