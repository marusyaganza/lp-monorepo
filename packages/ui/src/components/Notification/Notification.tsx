import React from 'react';
import { useSpring, animated } from 'react-spring';
import { cn } from '../../utils/classnames';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/icon';

import styles from './Notification.module.css';

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
  const animation = useSpring({
    from: { opacity: 0, transform: `translateY(-200%)` },
    to: { opacity: 1, transform: `translateY(0)` }
  });
  return (
    <animated.div
      style={animation}
      className={cn(className, styles.notificationContainer)}
    >
      <div
        data-cy={`notification-${variant}`}
        className={cn(
          styles.notificationContent,
          styles[`${variant}Notification`]
        )}
      >
        <div>
          <h3 className={styles.notificationText}>
            <Icon id={variant} className={styles[`${variant}Icon`]} />
            {text}
          </h3>
          <p className={styles.notificationSubText}>{subText}</p>
        </div>
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
    </animated.div>
  );
};
