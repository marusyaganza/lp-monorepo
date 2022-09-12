import React from 'react';
import './Spinner.css';

export interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div className={`spinnerBox ${className}`}>
      <p className="altText" role="alert">
        Loading...
      </p>
      <div className="pulseContainer">
        <div className="pulseBubble pulseBubble1" />
        <div className="pulseBubble pulseBubble2" />
        <div className="pulseBubble pulseBubble3" />
      </div>
    </div>
  );
};
