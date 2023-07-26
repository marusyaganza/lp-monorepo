import React from 'react';
import { Progress, ProgressProps } from './Progress';
import '../../assets/styles/common-styles.css';

export default {
  title: 'Progress',
  component: Progress,
  argTypes: {
    value: {
      control: { type: 'number' },
      defaultValue: 30,
      min: 10,
      max: 100,
      step: 10
    }
  }
};
export const ProgressDefault = (args: ProgressProps) => {
  return (
    <div className="presentationBox">
      <Progress {...args} />
    </div>
  );
};
