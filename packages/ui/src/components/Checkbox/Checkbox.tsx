import React, { ChangeEventHandler, ReactNode, useState } from 'react';
import { cn } from '../../utils/classnames';
import { Icon, IconIdType } from '../Icon/icon';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  variant?: 'isOffensive' | 'hidden' | 'withIcon';
  label?: ReactNode;
  name?: string;
  initialValue?: boolean;
  iconId?: IconIdType;
  onChange: (val: boolean) => void;
  /**additional styling */
  className?: string;
}
/**Checkbox input */
export const Checkbox = ({
  variant,
  label,
  name,
  initialValue,
  className,
  iconId = 'asc',
  onChange
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(initialValue || false);

  const renderLabel = () => {
    if (variant === 'isOffensive') {
      return (
        <span className={styles.offensive}>
          <Icon width={20} height={23} id="fire" />
          offensive
        </span>
      );
    }
    if (variant === 'withIcon') {
      return (
        <span>
          <Icon width={22} height={20} id={iconId} />
          <span className={styles.hiddenText}>{label}</span>
        </span>
      );
    }
    return label;
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const val = !!e.target.checked;
    setIsChecked(val);
    onChange(val);
  };
  return (
    <label
      className={cn(styles.label, variant && styles[variant], className)}
      data-cy="checkbox-label"
    >
      {renderLabel()}
      <input
        data-cy="checkbox"
        onChange={handleChange}
        checked={isChecked}
        type="checkbox"
        name={name}
      />
    </label>
  );
};
