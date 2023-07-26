import React from 'react';
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
  return (
    <div className="presentationBox">
      <OptionBox
        {...args}
        options={options}
        value="heart"
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};
