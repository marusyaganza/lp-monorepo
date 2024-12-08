import React, { forwardRef, useMemo, useState } from 'react';
import { cn } from '../../utils/classnames';
import { TextInput } from '../TextInput/TextInput';

import styles from './ConjugationInput.module.css';

export interface ConjugationInputProps {
  onChange: (value: string) => void;
  correctAnswer?: string;
  variant?: 'initial' | 'success' | 'error';
  isDisabled?: boolean;
  dataCy?: string;
  tense?: string | null;
  initialValue?: string;
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

const INITIAL_VALUES = Array(6).fill('');

/**Conjugation game input */
export const ConjugationInput = forwardRef<
  HTMLInputElement,
  ConjugationInputProps
>(
  (
    {
      onChange,
      className,
      correctAnswer = '',
      variant,
      isDisabled,
      dataCy,
      initialValue
    },
    ref
  ) => {
    const [values, setValues] = useState(() => {
      const initVals = { ...INITIAL_VALUES };
      if (initialValue?.length) {
        initialValue.split(', ').forEach((value, index) => {
          if (value === '-') {
            initVals[index] = value;
          }
        });
      }
      return initVals;
    });

    const correctAnswers = useMemo(
      () => correctAnswer.split(', '),
      [correctAnswer]
    );

    const getChangeHandler = (index: number) => {
      return function handleChange(val: string) {
        const newValues = { ...values };
        newValues[index] = val;
        setValues(newValues);
        onChange(Object.values(newValues).join(', '));
      };
    };

    const renderInputs = () => {
      return PRONOUNS.map((pronoun: string, index: number) => {
        let currentValue = values[index];

        const disableInput = values?.[index] === '-';

        if (disableInput) {
          currentValue = values?.[index];
        }

        let currentVariant = variant;

        if (
          currentVariant === 'error' &&
          currentValue === correctAnswers[index]
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
