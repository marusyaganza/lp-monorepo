import React, { ChangeEventHandler, useState } from 'react';

import { cn } from '../../utils/classnames';

import styles from './ColorInput.module.css';

export interface ColorInputProps {
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
/**Color input that includes color picker and a text input */
export const ColorInput = ({
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
}: ColorInputProps) => {
  const isInValid = errorText?.length !== 0;
  const [value, setValue] = useState(initialValue || '');
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.target;
    const formattedValue = value.startsWith('#') ? value : `#${value}`;
    setValue(formattedValue);
    onChange(formattedValue);
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
          <input
            disabled={isDisabled}
            className={cn(styles.input, styles[fontStyle])}
            name={name}
            value={value}
            onChange={handleChange}
          />
          <input
            type="color"
            disabled={isDisabled}
            className={styles.colorInput}
            name={name}
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
