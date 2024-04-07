import React, { useState, forwardRef, useMemo, useEffect } from 'react';
import { cn } from '../../utils/classnames';
import { TextInput } from '../TextInput/TextInput';

import styles from './ConjugationInput.module.css';

export interface ConjugationInputProps {
  onChange: (value: string) => void;
  correctAnswer?: string;
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

const INITIAL_VALUES = Array(6).fill('');

/**Component description goes here */
export const ConjugationInput = forwardRef<
  HTMLInputElement,
  ConjugationInputProps
>(
  (
    { onChange, className, correctAnswer = '', variant, isDisabled, dataCy },
    ref
  ) => {
    const [values, setValues] = useState(INITIAL_VALUES);
    const correctAnswers = useMemo(
      () => correctAnswer.split(', '),
      [correctAnswer]
    );

    console.log('variant', variant, correctAnswer);

    const getChangeHandler = (index: number) => {
      return function handleChange(val: string) {
        const newValues = [...values];
        newValues[index] = val;
        setValues(newValues);
        onChange(newValues.join(', '));
      };
    };

    useEffect(() => {
      if (!correctAnswer && variant === 'initial') {
        setValues(INITIAL_VALUES);
      }
    }, [correctAnswer, variant]);

    const renderInputs = () => {
      return PRONOUNS.map((pronoun: string, index: number) => {
        const currentValue = values[index];
        let currentVariant = variant;
        if (
          currentVariant === 'error' &&
          currentValue === correctAnswers[index]
        ) {
          currentVariant = 'success';
        }
        return (
          <label key={pronoun} className={styles.inputContainer}>
            <span className={styles.pronoun}>{pronoun}</span>
            <TextInput
              className={styles.input}
              dataCy={`${dataCy}-${index}`}
              isDisabled={isDisabled}
              variant={currentVariant}
              ref={index === 0 ? ref : undefined}
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
