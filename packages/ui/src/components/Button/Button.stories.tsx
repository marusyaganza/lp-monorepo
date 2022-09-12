import React from 'react';
import { Button, ButtonProps } from './Button';

export default {
  title: 'Button',
  component: Button
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

export const Btn = (args: ButtonProps) => (
  <Button {...args}>First button</Button>
);
