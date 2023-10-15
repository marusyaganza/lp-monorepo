import React, { ChangeEvent, MouseEventHandler } from 'react';
import { cn } from '../../utils/classnames';
import { Button } from '../Button/Button';
import { IconIdType } from '../Icon/icon';

import styles from './InputWithButton.module.css';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  text?: string;
}

export interface InputWithButtonProps {
  /**InputWithButton prop */
  value: string;
  name: string;
  label?: string;
  /**The color of the button */
  variant?: 'dark' | 'purple' | 'withoutButton';
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
  buttonIconId?: IconIdType;
  buttonText?: string;
  fontStyle?: 'primary' | 'secondary';
  errorText?: string;
  ignoreErrors?: boolean;
  /**additional styling */
  className?: string;
  upButtonProps?: ButtonProps;
  downButtonProps?: ButtonProps;
  showAdditionalControls?: boolean;
}
/**Input with button */
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
  errorText,
  ignoreErrors,
  upButtonProps,
  downButtonProps,
  showAdditionalControls,
  ...rest
}: InputWithButtonProps) => {
  const isInValid = errorText?.length !== 0;
  return (
    <div {...rest} className={cn(className, isInValid ? styles.incorrect : '')}>
      <label className={styles.inputContainer}>
        {label && <span className={styles.label}>{label}</span>}
        <div className={styles.inputWrapper}>
          {showAdditionalControls && (
            <div className={styles.buttonsContainer}>
              <Button
                onClick={upButtonProps?.onClick}
                variant="icon"
                iconHeight={20}
                iconWidth={20}
                iconId="arrow-up"
                disabled={upButtonProps?.disabled}
              >
                {upButtonProps?.text || 'Up'}
              </Button>
              <Button
                onClick={downButtonProps?.onClick}
                iconHeight={20}
                iconWidth={20}
                variant="icon"
                iconId="arrow-down"
                disabled={downButtonProps?.disabled}
              >
                {downButtonProps?.text || 'Down'}
              </Button>
            </div>
          )}
          <textarea
            className={cn(styles.input, styles[fontStyle])}
            name={name}
            rows={value?.length / 32 + 1 || 1}
            value={value}
            onChange={onChange}
          />
          {variant !== 'withoutButton' && (
            <Button
              data-cy={`button-${buttonIconId}`}
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
          )}
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
