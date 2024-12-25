import React, { forwardRef } from 'react';
import { cn } from '../../utils/classnames';
import { TextInput } from '../TextInput/TextInput';

import styles from './ConjugationInput.module.css';

export interface ConjugationInputProps {
  onChange: (value: string[]) => void;
  values: string[];
  correctAnswer: string[];
  variant?: 'initial' | 'success' | 'error';
  isDisabled?: boolean;
  dataCy?: string;
  /**additional styling */
  className?: string;
}

const PRONOUNS = [
  'yo',
  'tú',
  'él ella',
  'nosotros',
  'vosotros',
  'ellos, ellas'
];

/**Conjugation game input */
export const ConjugationInput = forwardRef<
  HTMLInputElement,
  ConjugationInputProps
>(
  (
    { onChange, className, correctAnswer, variant, isDisabled, dataCy, values },
    ref
  ) => {
    const getChangeHandler = (index: number) => {
      return function handleChange(val: string) {
        const newValues = [...values];
        newValues[index] = val;
        onChange(newValues);
      };
    };

    const renderInputs = () => {
      return PRONOUNS.map((pronoun: string, index: number) => {
        const currentValue = values[index];

        const disableInput = values?.[index] === '-';

        let currentVariant = variant;

        if (
          currentVariant === 'error' &&
          currentValue === correctAnswer[index]
        ) {
          currentVariant = 'success';
        }

        const isFirst = !disableInput && index === 0;

        return (
          <label key={pronoun} className={styles.inputContainer}>
            <span className={styles.pronoun}>{pronoun}</span>
            <TextInput
              className={styles.input}
              dataCy={`${dataCy}-${index}`}
              isDisabled={disableInput || isDisabled}
              variant={currentVariant}
              ref={isFirst ? ref : undefined}
              value={currentValue}
              name={pronoun}
              onChange={getChangeHandler(index)}
            />
          </label>
        );
      });
    };
    return (
      <div data-cy={dataCy} className={cn(className, styles.container)}>
        {renderInputs()}
      </div>
    );
  }
);

ConjugationInput.displayName = 'ConjugationInput';
