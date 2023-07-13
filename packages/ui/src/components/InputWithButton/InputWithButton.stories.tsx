import React, { useState } from 'react';
import { InputWithButton, InputWithButtonProps } from './InputWithButton';
import '../../assets/styles/common-styles.css';

export default {
  title: 'InputWithButton',
  component: InputWithButton,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  }
};

export const InputWithButtonDefault = (args: InputWithButtonProps) => {
  const [value, setValue] = useState('');
  return (
    <div className="presentationBox">
      <InputWithButton
        {...args}
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export const InputWithButtonError = (args: InputWithButtonProps) => {
  return (
    <div className="presentationBox">
      <InputWithButton {...args} errorText="inpout cannot be empty" />
    </div>
  );
};
