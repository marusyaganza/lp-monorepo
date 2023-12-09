import React, { useState } from 'react';
import { OptionBox } from './OptionBox';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof OptionBox> = {
  title: 'OptionBox',
  component: OptionBox,
  decorators: [styledPreviewDecorator()]
};

const options = [
  'liver',
  'beaver',
  'heart',
  'egg',
  'honorificabilitudinitatibus',
  'foot'
];

export const OptionBoxDefault = () => {
  const [value, setValue] = useState('');
  return (
    <OptionBox
      options={options}
      value={value}
      onChange={val => {
        setValue(val);
      }}
    />
  );
};

export const OptionBoxSuccess = {
  args: {
    correctOption: 'heart',
    variant: 'success',
    isDisabled: true,
    options
  }
};

export const OptionBoxError = {
  args: {
    correctOption: 'heart',
    variant: 'error',
    incorrectOption: 'egg',
    isDisabled: true,
    options
  }
};

export default meta;
