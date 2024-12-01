import React from 'react';
import { cn } from '../../utils/classnames';

import styles from './Progress.module.css';

export interface ProgressProps {
  /**Progress value */
  value: number;
  /**additional styling */
  className?: string;
}
/**Progress bar */
export const Progress = ({ value, className }: ProgressProps) => {
  return (
    <progress
      data-cy="game-progress"
      className={cn(className, styles.progress)}
      max="100"
      value={value}
    />
  );
};
