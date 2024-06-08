import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  PropsWithChildren
} from 'react';

import { Icon } from '../Icon/icon';

import styles from './Select.module.css';
import { cn } from '../../utils/classnames';

export interface SelectProps<T extends string> {
  /**currently selected value */
  value?: T;
  /**additional styling */
  className?: string;
  /**aligh options to the right or to the left */
  placement?: 'right' | 'left' | 'center';
  /**a handler that renders current value */
  renderValue?: (value?: T) => ReactNode;
  size?: 'S' | 'M';
  variant?: 'withIcon';
  label?: string;
}

export const Select = function <T extends string>({
  children,
  value,
  renderValue,
  placement = 'right',
  variant,
  size = 'S',
  className,
  label
}: PropsWithChildren<SelectProps<T>>) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const clickOutsideHandler = (event: MouseEvent) => {
    const target = event.target as Node | null;
    if (!ref?.current?.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', clickOutsideHandler);
    } else {
      document.removeEventListener('click', clickOutsideHandler);
    }

    return () => {
      document.removeEventListener('click', clickOutsideHandler);
    };
  }, [isOpen]);

  return (
    <div data-cy="select" ref={ref} className={cn(styles.container, className)}>
      <div className={styles.selectContainer}>
        {label && <span className={styles.selectLabel}>{label}</span>}
        <div className={cn(styles.currentValue, styles[`size${size}`])}>
          <button
            type="button"
            className={cn(styles.select, variant ? styles[variant] : '')}
            onClick={() => {
              setIsOpen(curr => !curr);
            }}
          >
            {renderValue ? renderValue(value) : value}
            {variant === 'withIcon' && (
              <Icon height={14} width={24} id={isOpen ? 'up' : 'down'} />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <ul
          data-cy="selectOptions"
          className={cn(
            styles.options,
            styles[placement],
            styles[`size${size}`]
          )}
        >
          {children}
        </ul>
      )}
    </div>
  );
};
