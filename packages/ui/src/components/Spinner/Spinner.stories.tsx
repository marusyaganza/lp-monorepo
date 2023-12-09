import React from 'react';
import { Spinner as SpinnerComponent, SpinnerSize } from './Spinner';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Spinner> = {
  title: 'Spinner',
  component: SpinnerComponent,
  decorators: [styledPreviewDecorator()]
};

export const SpinnerPrimary = {
  args: {
    variant: 'primary'
  }
};

export const SpinnerSecondary = {
  args: {
    variant: 'secondary'
  }
};

const sizes: SpinnerSize[] = ['S', 'M', 'L'];

export const Spinner = () => {
  return sizes.map(size => (
    <div key={size} className="presentationBox">
      size: {size}
      <SpinnerComponent size={size} />
    </div>
  ));
};

export default meta;
