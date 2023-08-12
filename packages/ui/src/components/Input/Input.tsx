import React, { HTMLAttributes, useCallback, useMemo, useState } from 'react';
import { validatorType } from '../../utils/validators';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/icon';
import { cn } from '../../utils/classnames';

import styles from './Input.module.css';

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
  /**name attribute of native HTML input element */
  name: string;
  /**input's label */
  label: string;
  /**array of validators */
  validators?: validatorType[];
  /**text that is shown if input is invalid */
  errorText?: string;
  /**defines if input has valid value */
  isValid?: boolean;
  /** defines if the input is focused by default => native html attribute*/
  autoFocus?: boolean;
  /**additional styling */
  className?: string;
  type?: 'text' | 'password';
  isDisabled?: boolean;
  autoComplete?: string;
  required?: boolean;
}

/**Default input component  */
export const Input = ({
  name,
  label,
  errorText,
  isValid = true,
  className,
  type = 'text',
  isDisabled,
  required,
  ...rest
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = useMemo(() => type === 'password', [type]);
  const handlePasswordVisivbility = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);
  return (
    <div
      className={cn(
        className,
        styles.container,
        isValid ? '' : styles.incorrect
      )}
    >
      <label htmlFor={name} className={styles.label}>
        <span className={styles.labelText}>{label}</span>
        {required && <Icon height={8} width={8} id="sun" />}
      </label>
      <input
        disabled={isDisabled}
        type={isPassword && isPasswordVisible ? 'text' : type}
        className={styles.input}
        name={name}
        {...rest}
      />
      {type === 'password' && (
        <Button
          disabled={isDisabled}
          className={styles.passwordButton}
          iconId={isPasswordVisible ? 'eye-slashed' : 'eye'}
          variant="icon"
          iconHeight={25}
          iconWidth={20}
          onClick={handlePasswordVisivbility}
        >
          {isPasswordVisible ? 'Hide password' : 'Show password'}
        </Button>
      )}
      <p aria-hidden={isValid} role="status" className={styles.errorText}>
        {errorText}
      </p>
    </div>
  );
};
