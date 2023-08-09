import React from 'react';
import { Checkbox, CheckboxProps } from './Checkbox';
import '../../assets/styles/common-styles.css';

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    prop: {
      control: { type: 'text' },
      defaultValue: 'prop text'
    }
  }
};

export const CheckboxDefault = (args: CheckboxProps) => {
  return (
    <div className="presentationBox">
      <Checkbox
        {...args}
        name="default"
        label="mock label"
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};

export const CheckboxIsOffensive = (args: CheckboxProps) => {
  return (
    <div className="presentationBox">
      <Checkbox
        {...args}
        name="default"
        variant="isOffensive"
        label="mock label"
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};

export const CheckboxHidden = (args: CheckboxProps) => {
  return (
    <div className="presentationBox">
      <Checkbox
        {...args}
        name="default"
        variant="hidden"
        label="mock label"
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};

export const CheckboxWithIcon = (args: CheckboxProps) => {
  return (
    <div className="presentationBox">
      <Checkbox
        {...args}
        name="default"
        variant="withIcon"
        iconId="desc"
        label="mock label"
        onChange={val => {
          console.log(val);
        }}
      />
    </div>
  );
};
