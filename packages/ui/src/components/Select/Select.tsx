import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  PropsWithChildren
} from 'react';

import styles from './Select.module.css';

export interface SelectProps<T extends string> {
  /**currently selected value */
  value?: T;
  /**additional styling */
  className?: string;
  /**a handler that renders current value */
  renderValue?: (value?: T) => ReactNode;
  /**Select change handler */
  onChange: (value: T) => void;
}

export const Select = function <T extends string>({
  children,
  value,
  onChange,
  renderValue
}: PropsWithChildren<SelectProps<T>>) {
  useEffect(() => {
    if (value) {
      onChange(value);
    }
  }, [value, onChange]);

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
        className={styles.select}
        onClick={() => {
          setIsOpen(curr => !curr);
        }}
      >
        {renderValue ? renderValue(value) : value}
      </button>
      {isOpen && <ul className={styles.options}>{children}</ul>}
    </div>
  );
};
