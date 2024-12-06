import React, { useCallback, ChangeEventHandler, forwardRef } from 'react';
import { cn } from '../../utils/classnames';

import styles from './OptionBox.module.css';
import { DictionaryEntity } from '../DictionaryEntity/DictionaryEntity';

export interface OptionBoxProps {
  options: string[];
  /**additional styling */
  className?: string;
  /**initial value */
  value?: string;
  onChange: (val: string) => void;
  isDisabled?: boolean;
  variant?: 'initial' | 'success' | 'error';
  correctOption?: string;
  incorrectOption?: string;
  dataCy?: string;
}
/**Option box is a component based on HTML radio input */
export const OptionBox = forwardRef<HTMLInputElement, OptionBoxProps>(
  (
    {
      options,
      className,
      onChange,
      value = '',
      isDisabled,
      variant = 'initial',
      correctOption,
      incorrectOption,
      dataCy
    },
    ref
  ) => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      e => {
        const val = e.target.value;
        onChange(val);
      },
      [onChange]
    );

    return (
      <div
        data-cy={dataCy || 'optionBox'}
        className={cn(className, styles.container)}
      >
        {options.map((option, i) => {
          let style;
          if (correctOption === option) {
            style = 'success';
          }
          if (variant === 'error' && incorrectOption === option) {
            style = 'error';
          }
          return (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label key={option} className={styles.optionContainer}>
              <input
                data-cy={style === 'success' ? 'correctAnswer' : undefined}
                className={styles.hidden}
                disabled={isDisabled}
                onChange={handleChange}
                type="radio"
                value={option}
                ref={i === 0 && variant === 'initial' ? ref : undefined}
                checked={option === value}
              />
              <div className={cn(styles.option, style && styles[style])}>
                <DictionaryEntity text={option} />
              </div>
            </label>
          );
        })}
      </div>
    );
  }
);

OptionBox.displayName = 'OptionBox';
