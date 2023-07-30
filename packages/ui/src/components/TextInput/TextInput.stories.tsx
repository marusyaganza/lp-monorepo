import React from 'react';
import { TextInput, TextInputProps } from './TextInput';
import '../../assets/styles/common-styles.css';

export default {
  title: 'TextInput',
  component: TextInput,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  }
};

export const TextInputDefault = (args: TextInputProps) => {
  return (
    <div className="presentationBox">
      <TextInput
        {...args}
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};

export const TextInputError = (args: TextInputProps) => {
  return (
    <div className="presentationBox">
      <TextInput {...args} variant="error" />
    </div>
  );
};

export const TextInputSuccess = (args: TextInputProps) => {
  return (
    <div className="presentationBox">
      <TextInput {...args} variant="success" />
    </div>
  );
};
