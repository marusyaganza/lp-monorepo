import React, { HTMLAttributes, PropsWithChildren } from 'react';
import './Button.css';

export interface ButtonProps {
  // TODO: implement those props
  // color?: 'primary' | 'secodary';
  // size?: 'S' | 'M' | 'L';
  className?: string;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
}

export const Button = ({
  children,
  type = 'button',
  className,
  disabled,
  ...rest
}: PropsWithChildren<ButtonProps> & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type={type}
      className={`button ${className || ''} ${disabled ? 'disabled' : ''}`}
      {...rest}
    >
      {children}
    </button>
  );
};
