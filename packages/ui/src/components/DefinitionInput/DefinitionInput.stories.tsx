import React from 'react';
import { DefinitionInput, DefinitionInputProps } from './DefinitionInput';
import '../../assets/styles/common-styles.css';

export default {
  title: 'DefinitionInput',
  component: DefinitionInput,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  }
};

export const DefinitionInputDefault = (args: DefinitionInputProps) => {
  return (
    <div className="presentationBox">
      <DefinitionInput
        {...args}
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};
