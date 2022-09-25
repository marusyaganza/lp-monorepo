import React from 'react';
import { Spinner as SpinnerComponent, SpinnerProps } from './Spinner';

export default {
  title: 'Spinner',
  component: SpinnerComponent
};

export const Spinner = (args: SpinnerProps) => (
  <div className="presentationBox">
    <SpinnerComponent {...args} />
  </div>
);
