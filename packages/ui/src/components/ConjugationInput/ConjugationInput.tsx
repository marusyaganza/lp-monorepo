import React, { forwardRef, useMemo } from 'react';
import { cn } from '../../utils/classnames';
import { TextInput } from '../TextInput/TextInput';

import styles from './ConjugationInput.module.css';
import { Tense } from '../../generated/graphql';

export interface ConjugationInputProps {
  onChange: (value: string) => void;
  correctAnswer?: string;
  variant?: 'initial' | 'success' | 'error';
  isDisabled?: boolean;
  dataCy?: string;
  tense?: string | null;
  value?: string;
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

const IMPF_INDEXES = [1, 2];

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
      initialValue,
      tense,
      value = ''
    },
    ref
  ) => {
    const correctAnswers = useMemo(
      () => correctAnswer.split(', '),
      [correctAnswer]
    );

    const isImpf = useMemo(() => tense === Tense.Impf, [tense]);
    const initialValues = useMemo(
      () => initialValue?.split(', '),
      [initialValue]
    );

    const values = useMemo(() => {
      if (value) {
        return value?.split(', ');
      }
      const initialVals = [...INITIAL_VALUES];
      if (isImpf && initialValues?.length) {
        initialVals.forEach((value, index) => {
          if (!IMPF_INDEXES.includes(index)) {
            initialVals[index] = initialValues[index];
          }
        });
      }
      return initialVals;
    }, [value, isImpf, initialValues]);

    const getChangeHandler = (index: number) => {
      return function handleChange(val: string) {
        const newValues = [...values];
        newValues[index] = val;
        onChange(newValues.join(', '));
      };
    };

    const renderInputs = () => {
      return PRONOUNS.map((pronoun: string, index: number) => {
        let currentValue = values[index];

        const disableInput =
          isImpf && initialValues?.length && !IMPF_INDEXES.includes(index);

        if (disableInput) {
          currentValue = initialValues[index];
        }

        let currentVariant = variant;

        if (
          currentVariant === 'error' &&
          currentValue === correctAnswers[index]
        ) {
          currentVariant = 'success';
        }

        const isFirst =
          (isImpf && index === IMPF_INDEXES[0]) ||
          (!disableInput && index === 0);

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
