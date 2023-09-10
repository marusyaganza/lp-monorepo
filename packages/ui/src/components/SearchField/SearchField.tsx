import React, {
  FormEvent,
  useState,
  useCallback,
  ChangeEventHandler
} from 'react';
import { Icon } from '../Icon/icon';
import { cn } from '../../utils/classnames';

import styles from './SearchField.module.css';

export interface SearchFieldProps {
  /**SearchField value */
  searchQuery?: string;
  /**Search form onSubmit callback */
  onSearch: (searchQuery?: string) => void;
  /**additional styling */
  className?: string;
}
/**SearchField component */
export const SearchField = ({
  searchQuery,
  className,
  onSearch
}: SearchFieldProps) => {
  const [value, setValue] = useState(searchQuery);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (value) {
      onSearch(value);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setValue(e.target.value);
  }, []);

  const handlerClear = useCallback(() => {
    setValue('');
  }, []);

  return (
    <form className={cn(className, styles.form)} onSubmit={handleSearch}>
      <button disabled={!value} className={cn(styles.button)} type="submit">
        <Icon id="search" width={20} height={20} />
        <span className={styles.buttonText}>search</span>
      </button>
      <input
        className={styles.input}
        onChange={handleChange}
        value={value}
        placeholder="Search"
      />
      <button
        onClick={handlerClear}
        disabled={!value}
        className={cn(styles.button)}
      >
        {value && <Icon id="eraser" width={20} height={20} />}
        <span className={styles.buttonText}>clear</span>
      </button>
    </form>
  );
};
