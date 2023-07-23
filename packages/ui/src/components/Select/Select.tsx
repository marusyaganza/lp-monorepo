import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  PropsWithChildren
} from 'react';

import styles from './Select.module.css';
import { cn } from '../../utils/classnames';

export interface SelectProps<T extends string> {
  /**currently selected value */
  value?: T;
  /**additional styling */
  className?: string;
  /**aligh options to the right or to the left */
  placement?: 'right' | 'left';
  /**a handler that renders current value */
  renderValue?: (value?: T) => ReactNode;
}

export const Select = function <T extends string>({
  children,
  value,
  renderValue,
  placement = 'right'
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
    <div ref={ref} className={styles.container}>
      <button
        type="button"
        className={styles.select}
        onClick={() => {
          setIsOpen(curr => !curr);
        }}
      >
        {renderValue ? renderValue(value) : value}
      </button>
      {isOpen && (
        <ul className={cn(styles.options, styles[placement])}>{children}</ul>
      )}
    </div>
  );
};
