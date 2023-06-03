import React, { MouseEventHandler, PropsWithChildren } from 'react';
import { cn } from '../../utils/classnames';
import { Icon, IconIdType } from '../Icon/icon';
import { Spinner } from '../Spinner/Spinner';
import styles from './Button.module.css';

/**All supported variants of button */
export type ButtonVariantType =
  | 'primary'
  | 'secondary'
  | 'ternary'
  | 'danger'
  | 'success'
  | 'iconWithText'
  | 'icon';

export interface ButtonProps {
  /**Defines the look of button */
  variant?: ButtonVariantType;
  /**Defines font size of button and its paddings */
  size?: 'S' | 'L';
  /**Additional styling */
  className?: string;
  /**Native HTML 'type' property */
  type?: 'submit' | 'button' | 'reset';
  /**Native HTML 'disabled' property */
  disabled?: boolean;
  /**Id of the icon */
  iconId?: IconIdType;
  /**Height of the icon in px */
  iconHeight?: number;
  /**Width of the icon in px */
  iconWidth?: number;
  /**Displays spinner instead of buttonText and disabled */
  isLoading?: boolean;
  /**onClick handler */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
/**
 *
 * Button component
 */
export const Button = ({
  children,
  type = 'button',
  className,
  disabled,
  variant = 'primary',
  size = 'S',
  iconId,
  iconHeight = 20,
  iconWidth = 20,
  isLoading,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const isIconButton = iconId && variant === 'icon';
  let iconButtonStyle;
  if (isIconButton && (iconHeight || iconWidth)) {
    const size = Math.max(iconHeight, iconWidth);
    iconButtonStyle = { height: size, width: size };
  }
  return (
    <button
      style={iconButtonStyle}
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        className,
        styles.button,
        styles[variant],
        styles[`size${size}`],
        disabled ? styles.disabled : ''
      )}
      {...rest}
    >
      {isLoading && !isIconButton && (
        <Spinner
          className={styles.formSpinner}
          size="S"
          variant={
            variant === 'secondary' || variant === 'ternary'
              ? 'primary'
              : 'secondary'
          }
        />
      )}
      <div className={cn(isLoading ? styles.loadingButtonText : '')}>
        <span hidden={isIconButton}>{children}</span>
      </div>
      {iconId && <Icon height={iconHeight} width={iconWidth} id={iconId} />}
    </button>
  );
};
