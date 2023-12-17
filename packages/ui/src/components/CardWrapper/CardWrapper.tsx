import React, { PropsWithChildren, KeyboardEvent } from 'react';
import { cn } from '../../utils/classnames';

import styles from './CardWrapper.module.css';

export interface CardWrapperProps {
  /**additional styling */
  className?: string;
  /**event handler that fires on click or on 'Enter' button when the component is focussed*/
  onClick?: () => void;
}
/**Wrapper for word card */
export const CardWrapper = ({
  className,
  children,
  onClick
}: PropsWithChildren<CardWrapperProps>) => {
  const keyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    //TODO figure out real type of this value
    const target: any = e.target;
    if (e.key === 'Enter' && onClick && target?.role === 'navigation') {
      onClick();
    }
  };
  return (
    <div
      data-cy="cardWrapper"
      onClick={onClick}
      tabIndex={0}
      role="navigation"
      onKeyPress={keyPressHandler}
      className={cn(className, styles.cardWrapper)}
    >
      {children}
    </div>
  );
};
