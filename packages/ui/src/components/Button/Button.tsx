import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../../utils/classnames';
import { Icon, IconIdType } from '../Icon/icon';
import './Button.css';

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
  ...rest
}: PropsWithChildren<ButtonProps> & HTMLAttributes<HTMLButtonElement>) => {
  console.log(children);
  const isIconButton = iconId && variant === 'icon';
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(className, 'button', variant, `size${size}`)}
      {...rest}
    >
      <span hidden={isIconButton}>{children}</span>
      {iconId && <Icon height={iconHeight} width={iconWidth} id={iconId} />}
    </button>
  );
};
