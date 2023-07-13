import React from 'react';
import { InputV2, InputV2Props } from './InputV2';
import '../../assets/styles/common-styles.css';

export default {
  title: 'InputV2',
  component: InputV2,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  }
};

export const InputV2Default = (args: InputV2Props) => {
  return (
    <div className="presentationBox">
      <InputV2
        {...args}
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};

export const InputV2Error = (args: InputV2Props) => {
  return (
    <div className="presentationBox">
      <InputV2 {...args} errorText="inpout cannot be empty" />
    </div>
  );
};
