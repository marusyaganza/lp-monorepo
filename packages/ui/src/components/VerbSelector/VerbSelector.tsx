import React, { ChangeEventHandler, useCallback, useState } from 'react';
import { cn } from '../../utils/classnames';

import styles from './VerbSelector.module.css';
import { Verb } from '../../generated/graphql';
import { Button } from '../Button/Button';

export interface VerbSelectorProps {
  options: Verb[];
  dataCy?: string;
  isDisabled?: boolean;
  onCancel: () => void;
  onSubmit: (val: string) => void;
  /**additional styling */
  className?: string;
}
/**Component for selection a verb to practice */
export const VerbSelector = ({
  options,
  dataCy,
  className,
  isDisabled,
  onSubmit,
  onCancel
}: VerbSelectorProps) => {
  const [value, setValue] = useState('');
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    const val = e.target.value;
    setValue(val);
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.selectWordContainer}>
      <Button
        className={styles.cancelButton}
        onClick={onCancel}
        iconHeight={24}
        iconWidth={24}
        variant="icon"
        iconId="close"
      >
        Cancel
      </Button>
      <h2 className={styles.heading}>Please select a word to practice</h2>
      <div
        data-cy={dataCy || 'optionBox'}
        className={cn(className, styles.container)}
      >
        {options.map(option => {
          return (
            <label key={option.id} className={styles.optionContainer}>
              <input
                className={styles.hidden}
                disabled={isDisabled}
                onChange={handleChange}
                type="radio"
                value={option.id}
                checked={option.id === value}
              />
              <div className={cn(styles.option)}>{option.name}</div>
            </label>
          );
        })}
      </div>
      <Button type="submit">Select</Button>
    </form>
  );
};
