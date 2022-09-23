import React from 'react';
import { Spinner as SpinnerComponent, SpinnerProps } from './Spinner';

export default {
  title: 'Spinner',
  component: SpinnerComponent
};

export const Spinner = (args: SpinnerProps) => <SpinnerComponent {...args} />;
