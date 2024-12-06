import { Notification } from './Notification';
import { styledPreviewDecorator } from '../../storybook-decorators';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Notification> = {
  title: 'general/Notification',
  component: Notification,
  decorators: [styledPreviewDecorator()]
};

export const NotificationSuccess = {
  args: {
    variant: 'success',
    text: 'Success!',
    subText: 'Happy text'
  }
};

export const NotificationError = {
  args: {
    variant: 'error',
    text: 'Error!',
    subText: 'Error description'
  }
};

export default meta;
