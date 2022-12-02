import React from 'react';
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
  return (
    <div className="presentationBox">
      <InputWithButton {...args} />
    </div>
  );
};
