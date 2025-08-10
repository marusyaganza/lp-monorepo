import { TagSelector } from './TagSelector';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta<typeof TagSelector> = {
  title: 'inputs/TagSelector',
  component: TagSelector,
  decorators: [styledPreviewDecorator()]
};

const tags = [
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
];

export const OptionBoxDefault = () => {
  const [value, setValue] = useState<string[]>();
  return (
    <TagSelector
      value={value}
      onChange={val => {
        setValue(val);
      }}
      tags={tags}
    />
  );
};

export default meta;
