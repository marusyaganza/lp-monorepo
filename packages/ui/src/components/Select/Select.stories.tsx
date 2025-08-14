import React from 'react';
import { useSelect } from './useSelect';
import { Select } from './Select';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Select> = {
  title: 'inputs/Select',
  component: Select,
  decorators: [styledPreviewDecorator()]
};

export const SelectDefault = () => {
  const onChange = (value: string) => {
    console.log('value', value);
  };
  const { Select, Option } = useSelect({ onChange });
  return (
    <div>
      <Select value="Option 1 selected value">
        <Option value="Option 1 selected value">Option 1</Option>
        <Option value="Option 2 selected value">Option 2</Option>
      </Select>
    </div>
  );
};

export default meta;
