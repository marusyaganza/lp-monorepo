import React from 'react';
import { Input, InputProps } from './Input';

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    name: {
      control: { type: 'text' },
      defaultValue: 'text'
    },
    label: {
      control: { type: 'text' },
      defaultValue: 'Text Input'
    },
    errorText: {
      control: { type: 'text' },
      defaultValue: 'Text is requierd'
    }
  }
};

export const DefaultInput = (args: InputProps) => {
  return (
    <div className="presentationBox">
      <Input {...args} />
    </div>
  );
};

export const InputDisabled = (args: InputProps) => {
  return (
    <div className="presentationBox">
      <Input {...args} isDisabled />
    </div>
  );
};

export const PasswordInput = (args: InputProps) => {
  return (
    <div className="presentationBox">
      <Input {...args} type="password" />
    </div>
  );
};

export const PasswordInputDisabled = (args: InputProps) => {
  return (
    <div className="presentationBox">
      <Input {...args} type="password" isDisabled />
    </div>
  );
};
