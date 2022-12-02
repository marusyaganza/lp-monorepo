import React, { ChangeEvent, MouseEventHandler } from 'react';
import { cn } from '../../utils/classnames';
import { Button } from '../Button/Button';
import { IconIdType } from '../Icon/icon';

import styles from './InputWithButton.module.css';

export interface InputWithButtonProps {
  /**InputWithButton prop */
  value: string;
  name: string;
  label?: string;
  variant?: 'dark' | 'purple';
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onButtonClick: MouseEventHandler<HTMLButtonElement>;
  buttonIconId?: IconIdType;
  buttonText?: string;
  fontStyle?: 'primary' | 'secondary';
  errorText?: string;
  /**additional styling */
  className?: string;
}
/**Component description goes here */
export const InputWithButton = ({
  value,
  name,
  label,
  onChange,
  variant = 'purple',
  className,
  onButtonClick,
  buttonIconId = 'plus',
  buttonText,
  fontStyle = 'primary',
  errorText
}: InputWithButtonProps) => {
  const isInValid = errorText?.length !== 0;
  return (
    <div className={cn(className, isInValid ? styles.incorrect : '')}>
      <label className={styles.inputContainer}>
        {label && <span className={styles.label}>{label}</span>}
        <div className={styles.inputWrapper}>
          <textarea
            className={cn(styles.input, styles[fontStyle])}
            name={name}
            rows={value.length / 32 + 1}
            value={value}
            onChange={onChange}
          />
          <Button
            iconHeight={22}
            iconWidth={20}
            variant="icon"
            className={cn(styles.button, styles[variant])}
            iconId={buttonIconId}
            shape="rectangular"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </div>
      </label>
      <p aria-hidden={isInValid} role="status" className={styles.errorText}>
        {errorText}
      </p>
    </div>
  );
};
