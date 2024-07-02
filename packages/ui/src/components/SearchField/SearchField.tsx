import React, {
  FormEvent,
  useState,
  useCallback,
  useRef,
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
  autofocus?: boolean;
  allowEmptySearch?: boolean;
}
/**SearchField component */
export const SearchField = ({
  searchQuery,
  className,
  onSearch,
  autofocus,
  allowEmptySearch
}: SearchFieldProps) => {
  const [value, setValue] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (value || allowEmptySearch) {
      onSearch(value);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setValue(e.target.value);
  }, []);

  const handlerClear = useCallback(() => {
    setValue('');
    inputRef?.current?.focus();
  }, []);

  return (
    <form
      data-cy="searchForm"
      className={cn(className, styles.form)}
      onSubmit={handleSearch}
    >
      <button
        disabled={!value && !allowEmptySearch}
        data-cy="searchButton"
        className={cn(styles.button)}
        type="submit"
      >
        <Icon id="search" width={20} height={20} />
        <span className={styles.buttonText}>search</span>
      </button>
      <input
        ref={inputRef}
        autoFocus={autofocus}
        className={styles.input}
        onChange={handleChange}
        value={value}
        placeholder="Search"
      />
      <button
        data-cy="clearButton"
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
