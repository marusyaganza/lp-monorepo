import React from 'react';
import { useSelect } from './useSelect';
import { Select } from './Select';
import '../../assets/styles/common-styles.css';

export default {
  title: 'Select',
  component: Select
};

export const SelectDefault = () => {
  const [{ Select, Option }] = useSelect();
  return (
    <div className="presentationBox">
      <Select
        onChange={value => {
          console.log('value', value);
        }}
        value="Option 1 value"
      >
        <Option value="Option 1 value">Option 1</Option>
        <Option value="Option 2 value">Option 2</Option>
      </Select>
    </div>
  );
};
