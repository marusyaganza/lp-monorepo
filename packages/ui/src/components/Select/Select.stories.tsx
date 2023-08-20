import React from 'react';
import { useSelect } from './useSelect';
import { Select } from './Select';
import '../../assets/styles/common-styles.css';

export default {
  title: 'Select',
  component: Select
};

export const SelectDefault = () => {
  const onChange = (value: string) => {
    console.log('value', value);
  };
  const { Select, Option } = useSelect({ onChange });
  return (
    <div className="presentationBox">
      <Select value="Option 1 value">
        <Option value="Option 1 value">Option 1</Option>
        <Option value="Option 2 value">Option 2</Option>
      </Select>
    </div>
  );
};
