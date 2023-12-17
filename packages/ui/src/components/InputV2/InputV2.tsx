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
  isDisabled?: boolean;
  /**additional styling */
  className?: string;
  dataCy?: string;
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
  initialValue,
  isDisabled,
  dataCy
}: InputV2Props) => {
  const isInValid = errorText?.length !== 0;
  const [value, setValue] = useState(initialValue || '');
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const val = e.target.value;
    setValue(val);
    onChange(val);
  };
  return (
    <div
      data-cy={dataCy}
      className={cn(className, isInValid ? styles.incorrect : '')}
    >
      <label className={styles.inputContainer}>
        {label && (
          <span className={cn(styles.label, isDisabled ? styles.disabled : '')}>
            {label}
          </span>
        )}
        <div className={styles.inputWrapper}>
          <textarea
            disabled={isDisabled}
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
