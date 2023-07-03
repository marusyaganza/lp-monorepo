import React, { PropsWithChildren, ChangeEventHandler } from 'react';
import { cn } from '../../utils/classnames';

import styles from './Select.module.css';

export interface OptionProps<T extends string> {
  /**Select prop */
  value: T;
  /**additional styling */
  className?: string;
  isChecked: boolean;
  onChange: (value?: T) => void;
}

/**Custom option component that based on HTML radio input */
export const Option = function <T extends string>({
  children,
  value,
  className,
  onChange,
  isChecked
}: PropsWithChildren<OptionProps<T>>) {
  const handleCahnge: ChangeEventHandler<HTMLInputElement> = e => {
    const val = e?.target?.value as T;
    if (val) {
      onChange(val);
    }
  };

  return (
    <li className={cn(styles.option, className)}>
      <label
        tabIndex={0}
        className={cn(styles.label, isChecked ? styles.checked : '')}
      >
        <input
          tabIndex={-1}
          className={styles.radio}
          onChange={handleCahnge}
          type="radio"
          checked={isChecked}
          value={value}
          name={value}
        />
        {children}
      </label>
    </li>
  );
};
