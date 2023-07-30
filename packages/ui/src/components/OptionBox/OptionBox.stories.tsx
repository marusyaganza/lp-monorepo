import React, { useState } from 'react';
import { OptionBox, OptionBoxProps } from './OptionBox';
import '../../assets/styles/common-styles.css';

export default {
  title: 'OptionBox',
  component: OptionBox,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  }
};

const options = [
  'liver',
  'beaver',
  'heart',
  'egg',
  'honorificabilitudinitatibus',
  'foot'
];

export const OptionBoxDefault = (args: OptionBoxProps) => {
  const [value, setValue] = useState('heart');
  return (
    <div className="presentationBox">
      <OptionBox
        {...args}
        options={options}
        value={value}
        onChange={val => {
          setValue(val);
        }}
      />
    </div>
  );
};

export const OptionBoxSuccess = (args: OptionBoxProps) => {
  return (
    <div className="presentationBox">
      <OptionBox
        {...args}
        options={options}
        value="heart"
        correctOption="heart"
        variant="success"
        isDisabled
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};

export const OptionBoxError = (args: OptionBoxProps) => {
  return (
    <div className="presentationBox">
      <OptionBox
        {...args}
        options={options}
        value="heart"
        correctOption="heart"
        variant="error"
        incorrectOption="egg"
        isDisabled
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};
