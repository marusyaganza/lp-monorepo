import React, { ChangeEventHandler, useState } from 'react';
import { cn } from '../../utils/classnames';

import styles from './InputV2.module.css';

export interface InputV2Props {
  name: string;
  initialValue?: string;
  label?: string;
  onChange: (value: string) => void;
  fontStyle?: 'primary' | 'secondary';
  errorText?: string;
  ignoreErrors?: boolean;
  /**additional styling */
  className?: string;
}
/**Input with button */
export const InputV2 = ({
  name,
  label,
  onChange,
  className,
  fontStyle = 'primary',
  errorText,
  ignoreErrors,
  initialValue
}: InputV2Props) => {
  const isInValid = errorText?.length !== 0;
  const [value, setValue] = useState(initialValue || '');
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const val = e.target.value;
    setValue(val);
    onChange(val);
  };
  return (
    <div className={cn(className, isInValid ? styles.incorrect : '')}>
      <label className={styles.inputContainer}>
        {label && <span className={styles.label}>{label}</span>}
        <div className={styles.inputWrapper}>
          <textarea
            className={cn(styles.input, styles[fontStyle])}
            name={name}
            rows={value?.length / 32 + 1 || 1}
            value={value}
            onChange={handleChange}
          />
        </div>
      </label>
      {!ignoreErrors && (
        <p aria-hidden={isInValid} role="status" className={styles.errorText}>
          {errorText}
        </p>
      )}
    </div>
  );
};
