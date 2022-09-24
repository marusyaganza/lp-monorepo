import React from 'react';
import { cn } from '../../utils/classnames';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/icon';

import styles from './Notification.module.css';

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
    <div className={cn(className, styles.notificationContainer)}>
      <div
        className={cn(
          styles.notificationContent,
          styles[`${variant}Notification`]
        )}
      >
        <h3 className={styles.notificationText}>
          <Icon id={variant} className={styles[`${variant}Icon`]} />
          {text}
        </h3>
        <p className={styles.notificationSubText}>{subText}</p>
        <Button
          onClick={onClose}
          variant="icon"
          className={styles.notificationCloseButton}
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
