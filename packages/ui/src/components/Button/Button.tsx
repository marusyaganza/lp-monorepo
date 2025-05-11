import React, { MouseEventHandler, PropsWithChildren, forwardRef } from 'react';
import { cn } from '../../utils/classnames';
import { Icon, IconIdType } from '../Icon/icon';
import { Spinner } from '../Spinner/Spinner';
import styles from './Button.module.css';
import { FocusableHTMLElement } from '../../types/types';

/**All supported variants of button */
export type ButtonVariantType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
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
  /** Determines if the button has action button style */
  isActionButton?: boolean;
  /**shape of the icon button */
  shape?: 'circle' | 'rectangular';
  /**Native HTML 'autofocus' property. Defines if the element initially focussed */
  autoFocus?: boolean;
}
/**
 *
 * Button component
 */
export const Button = forwardRef<
  FocusableHTMLElement,
  PropsWithChildren<ButtonProps>
>(
  (
    {
      children,
      type = 'button',
      className,
      disabled,
      variant = 'primary',
      size = 'S',
      iconId,
      iconHeight = 16,
      iconWidth = 16,
      isLoading,
      isActionButton,
      shape = 'circle',
      ...rest
    },
    ref
  ) => {
    const isIconButton = iconId && variant === 'icon';

    let iconButtonStyle;

    if (isIconButton && (iconHeight || iconWidth)) {
      if (isIconButton && (iconHeight || iconWidth) && shape === 'circle') {
        const size = Math.max(iconHeight, iconWidth);
        iconButtonStyle = { height: size, width: size };
      }
    }

    return (
      <button
        ref={ref}
        style={iconButtonStyle}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          styles.button,
          styles[variant],
          styles[`size${size}`],
          disabled ? styles.disabled : '',
          isActionButton ? styles.actionButton : '',
          className
        )}
        {...rest}
      >
        {isLoading && !isIconButton && (
          <Spinner
            className={styles.formSpinner}
            size={isActionButton ? 'S' : 'M'}
            variant={
              variant === 'secondary' || variant === 'tertiary'
                ? 'primary'
                : 'secondary'
            }
          />
        )}
        <div className={cn(isLoading ? styles.loadingButtonText : '')}>
          <span hidden={isIconButton}>{children}</span>
        </div>
        {iconId && !isLoading && (
          <Icon height={iconHeight} width={iconWidth} id={iconId} />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
