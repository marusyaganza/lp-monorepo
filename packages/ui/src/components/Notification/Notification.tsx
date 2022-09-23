import React from 'react';
import { cn } from '../../utils/classnames';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/icon';

import './Notification.css';

//TODO: animate this component
export interface NotificationProps {
  /**Main text */
  text: string;
  /**look of notification */
  variant?: 'success' | 'error';
  /**subtext */
  subText?: string;
  /**Close button handler */
  onClose?: () => void;
  /**additional styleing */
  className?: string;
}
/**Notification component */
export const Notification = ({
  variant = 'success',
  text,
  subText,
  onClose,
  className
}: NotificationProps) => {
  return (
    <div className={cn(className, 'notificationContainer')}>
      <div
        className={cn(
          'notificationContent',
          `${variant}Notification`
          // className
        )}
      >
        <h3 className="notificationText">
          <Icon id={variant} className={`${variant}Icon`} />
          {text}
        </h3>
        <p className="notificationSubText">{subText}</p>
        <Button
          onClick={onClose}
          variant="icon"
          className={cn('notificationCloseButton')}
          iconId="close"
          iconHeight={28}
          iconWidth={17}
        >
          Close
        </Button>
      </div>
    </div>
  );
};
