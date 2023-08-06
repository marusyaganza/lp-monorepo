import React, { ChangeEventHandler, ReactNode, useState } from 'react';
import { cn } from '../../utils/classnames';
import { Icon } from '../Icon/icon';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  variant?: 'classic' | 'isOffensive' | 'hidden';
  label?: ReactNode;
  name?: string;
  initialValue?: boolean;
  onChange: (val: boolean) => void;
  /**additional styling */
  className?: string;
}
/**Checkbox input */
export const Checkbox = ({
  variant = 'classic',
  label,
  name,
  initialValue,
  className,
  onChange
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(initialValue);
  const renderIsOffensive = () => {
    return (
      <span className={styles.offensive}>
        <Icon width={20} height={23} id="fire" />
        offensive
      </span>
    );
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const val = e.target.checked;
    setIsChecked(val);
    onChange(val);
  };
  return (
    <label className={cn(styles.label, styles[variant], className)}>
      {variant === 'isOffensive' ? renderIsOffensive() : label}
      <input
        onChange={handleChange}
        checked={isChecked}
        type="checkbox"
        name={name}
      />
    </label>
  );
};
