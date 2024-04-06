import React, { PropsWithChildren } from 'react';
import { cn } from '../../utils/classnames';

import styles from './Tag.module.css';

export interface TagProps {
  /**Tag text */
  text?: string;
  /**Tag color */
  color?: string;
  /**additional styling */
  className?: string;
}
/**Component description goes here */
export const Tag = ({
  text,
  color,
  className,
  children
}: PropsWithChildren<TagProps>) => {
  return (
    <span
      style={{ backgroundColor: color }}
      className={cn(className, styles.tag)}
    >
      {text && `#${text}`}
      {children}
    </span>
  );
};
