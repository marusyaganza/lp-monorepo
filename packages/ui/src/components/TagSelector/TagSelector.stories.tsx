import { TagSelector } from './TagSelector';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof TagSelector> = {
  title: 'TagSelector',
  component: TagSelector,
  decorators: [styledPreviewDecorator()]
};

export const TagSelectorDefault = {
  args: {
    tags: [
      {
        text: 'Terry Pratchett',
        color: '#BFB3E7',
        id: '1',
        user: '0'
      },
      {
        text: 'IT',
        color: '#E1AFAF',
        id: '2',
        user: '0'
      }
    ],
    initialValues: ['1']
  }
};

export default meta;
