import React, { ChangeEventHandler, forwardRef } from 'react';
import { cn } from '../../utils/classnames';

import styles from './TextInput.module.css';

export interface TextInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  variant?: 'initial' | 'success' | 'error';
  /**additional styling */
  className?: string;
}
/**Text Input for the Game component*/
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ name, onChange, value, isDisabled, variant = 'initial' }, ref) => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
      const val = e.target.value;
      onChange(val);
    };
    return (
      <div className={cn(styles.inputWrapper, styles[variant])}>
        <input
          ref={ref}
          type="text"
          autoComplete="off"
          spellCheck="false"
          disabled={isDisabled}
          className={cn(styles.input, styles[variant])}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
