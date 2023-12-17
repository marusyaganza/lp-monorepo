import React from 'react';
import { cn } from '../../utils/classnames';
import './Spinner.css';

export type SpinnerSize = 'S' | 'M' | 'L';

export interface SpinnerProps {
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: SpinnerSize;
}

export const Spinner = ({
  className,
  variant = 'primary',
  size = 'L'
}: SpinnerProps) => {
  return (
    <div data-cy="spinner" className={cn('spinnerBox', className)}>
      <p className="altText" role="alert">
        Loading...
      </p>
      <div className={cn('pulseContainer', `${variant}Spinner`, `size${size}`)}>
        <div className="pulseBubble pulseBubble1" />
        <div className="pulseBubble pulseBubble2" />
        <div className="pulseBubble pulseBubble3" />
      </div>
    </div>
  );
};
