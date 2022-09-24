import React from 'react';
import { Notification, NotificationProps } from './Notification';
import '../../assets/styles/common-styles.css';

export default {
  title: 'Notification',
  component: Notification,
  argTypes: {
    text: {
      control: { type: 'text' },
      defaultValue: 'Text prop'
    },
    subText: {
      control: { type: 'text' },
      defaultValue: 'Subtext prop'
    }
  }
};

export const NotificationSuccess = (args: NotificationProps) => {
  return (
    <div className="presentationBox">
      <Notification {...args} variant="success" />
    </div>
  );
};

export const NotificationError = (args: NotificationProps) => {
  return (
    <div className="presentationBox">
      <Notification {...args} variant="error" />
    </div>
  );
};
