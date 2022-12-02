import React from 'react';
import { ArrayInput, ArrayInputProps } from './ArrayInput';
import '../../assets/styles/common-styles.css';

export default {
  title: 'ArrayInput',
  component: ArrayInput,
  argTypes: {
    label: {
      control: { type: 'text' },
      defaultValue: 'label text'
    }
  }
};

export const ArrayInputDefault = (args: ArrayInputProps) => {
  return (
    <div className="presentationBox">
      <ArrayInput
        {...args}
        variant="dark"
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};
