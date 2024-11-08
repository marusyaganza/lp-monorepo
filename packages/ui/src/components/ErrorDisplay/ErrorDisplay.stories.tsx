import { ErrorDisplay } from './ErrorDisplay';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ErrorDisplay> = {
  title: 'general/ErrorDisplay',
  component: ErrorDisplay,
  decorators: [styledPreviewDecorator('page')]
};

export const ErrorDisplayDefault = {
  args: {
    heading: 'Some error',
    buttonText: 'reload'
  }
};

export default meta;
