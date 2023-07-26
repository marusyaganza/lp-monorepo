import React, { useState, useCallback, ChangeEventHandler } from 'react';
import { cn } from '../../utils/classnames';

import styles from './OptionBox.module.css';

export interface OptionBoxProps {
  options: string[];
  /**additional styling */
  className?: string;
  /**initial value */
  value?: string;
  onChange: (val: string) => void;
  isDisabled?: boolean;
  variant?: 'default' | 'success' | 'error';
}
/**Option box is a component based on HTML radio input */
export const OptionBox = ({
  options,
  className,
  onChange,
  value = '',
  isDisabled,
  variant = 'default'
}: OptionBoxProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      const val = e.target.value;
      setCurrentValue(e.target.value);
      onChange(val);
    },
    [onChange]
  );

  return (
    <div className={cn(className, styles.container)}>
      {options.map(option => {
        return (
          <label key={option} className={styles.optionContainer}>
            <input
              className={styles.hidden}
              disabled={isDisabled}
              onChange={handleChange}
              type="radio"
              value={option}
              checked={option === currentValue}
            />
            <div className={cn(styles.option, styles[variant])}>{option}</div>
          </label>
        );
      })}
    </div>
  );
};
