import React, { HTMLAttributes, PropsWithChildren } from 'react';
import './Button.css';

interface ButtonProps {
  color?: 'primary' | 'secodary';
  size?: 'S' | 'M' | 'L';
  className?: string;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
}

export const Button = ({
  children,
  type = 'button',
  className,
  ...rest
}: PropsWithChildren<ButtonProps> & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button type={type} className={`button ${className}`} {...rest}>
      {children}
    </button>
  );
};
