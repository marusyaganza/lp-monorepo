import React, { MouseEventHandler, useState, useMemo } from 'react';
import { cn } from '../../utils/classnames';

import { WordDefinition } from '../../generated/graphql';
import { InputWithButton } from '../InputWithButton/InputWithButton';

import styles from './DefinitionInput.module.css';

export interface DefinitionInputProps {
  /**DefinitionInput initial value */
  initialValue?: WordDefinition[];
  onChange: (value: WordDefinition[]) => void;
  errorText?: string;
  /**Defines whether examples have translations. */
  withTranslation?: boolean;
  /**additional styling */
  className?: string;
}

/**DefinitionInput is an input for Word's 'defs' property */
export const DefinitionInput = ({
  initialValue,
  className,
  onChange,
  errorText,
  withTranslation
}: DefinitionInputProps) => {
  const defaultExamples = withTranslation
    ? [{ text: '', translation: '' }]
    : [{ text: '' }];

  const defaultInitialValues = [{ def: '', examples: [...defaultExamples] }];

  const initialValues = useMemo(() => {
    if (Array.isArray(initialValue)) {
      return initialValue.map(val => {
        if (!val?.examples?.length) {
          return { ...val, examples: [{ text: '' }] };
        }
        return val;
      });
    }
    return [...defaultInitialValues];
  }, [initialValue]);

  const [values, setValues] = useState<WordDefinition[]>(initialValues);

  const getExamplesChangeHandler = (
    defIndex: number,
    parentIndex: number,
    prop: 'text' | 'translation'
  ) => {
    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = event.target.value;
      const newVals = [...values];
      const example = newVals?.[defIndex]?.examples?.[parentIndex];
      if (typeof example?.[prop] === 'string') {
        example[prop] = val;
      }
      setValues([...newVals]);
      onChange([...newVals]);
    };
    return changeHandler;
  };

  const getDefinitionChangeHandler = (index: number) => {
    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newVals = [...values];
      newVals[index].def = event?.target?.value;
      setValues([...newVals]);
      onChange(newVals.filter(v => v.def));
    };
    return changeHandler;
  };

  const getRemoveInputHandler: (
    index: number
  ) => MouseEventHandler<HTMLButtonElement> = index => {
    const removeInputHandler = () => {
      const newVals = [...values];
      newVals.splice(index, 1);
      setValues([...newVals]);
      onChange(newVals.filter(Boolean));
    };
    return removeInputHandler;
  };

  const getRemoveExampleInputHandler: (
    parentIndex: number,
    index: number
  ) => MouseEventHandler<HTMLButtonElement> = (parentIndex, index) => {
    const removeInputHandler = () => {
      const newVals = [...values];
      newVals[parentIndex]?.examples?.splice(index, 1);
      setValues([...newVals]);
      onChange(newVals.filter(Boolean));
    };
    return removeInputHandler;
  };

  const addButtonClickHandler = () => {
    setValues(prev => [...prev, defaultInitialValues[0]]);
  };

  const getExamplesAddButtonClickHandler = (defIndex: number) => {
    const addExample = () => {
      const newVals = [...values];
      const def = values[defIndex];
      if (Array.isArray(def.examples)) {
        def.examples = [...def.examples, defaultExamples[0]];
      }
      setValues(newVals);
    };
    return addExample;
  };

  const getDefOrderHandler = (index: number, direction: 'up' | 'down') => {
    if (
      (index === 0 && direction === 'up') ||
      (index === values.length - 1 && direction === 'down')
    ) {
      return;
    }
    return () => {
      const indexToReplace = direction === 'up' ? index - 1 : index + 1;
      const newVals = [...values];
      newVals[index] = values[indexToReplace];
      newVals[indexToReplace] = values[index];
      setValues(newVals);
      onChange(newVals.filter(v => v.def));
    };
  };

  return (
    <div data-cy="formField-defs" className={cn(className, styles.template)}>
      {values.map((value, i) => {
        const isLast = i === values.length - 1;
        return (
          <div key={`definition ${i + 1}`}>
            <InputWithButton
              dataCy="defInput"
              showAdditionalControls={values.length > 1}
              upButtonProps={{
                onClick: getDefOrderHandler(i, 'up'),
                disabled: i === 0
              }}
              downButtonProps={{
                onClick: getDefOrderHandler(i, 'down'),
                disabled: isLast
              }}
              value={value.def}
              name="definition"
              label={`definition ${i + 1}`}
              buttonIconId={isLast ? 'plus' : 'minus'}
              onButtonClick={
                isLast ? addButtonClickHandler : getRemoveInputHandler(i)
              }
              errorText={i === 0 ? errorText : undefined}
              onChange={getDefinitionChangeHandler(i)}
            />
            {value?.examples?.map((example, j) => {
              const length = value?.examples?.length;
              const isLastEx = length && j === length - 1;
              return (
                <div key={`example ${j + 1} of def ${i}`}>
                  <InputWithButton
                    dataCy="exampleInput"
                    ignoreErrors
                    fontStyle="secondary"
                    variant="dark"
                    value={example?.text || ''}
                    name={`example ${j + 1} text`}
                    label={`example ${j + 1}`}
                    className={styles.examples}
                    buttonIconId={isLastEx ? 'plus' : 'minus'}
                    onButtonClick={
                      isLastEx
                        ? getExamplesAddButtonClickHandler(i)
                        : getRemoveExampleInputHandler(i, j)
                    }
                    errorText={i === 0 ? errorText : undefined}
                    onChange={getExamplesChangeHandler(i, j, 'text')}
                  />
                  {withTranslation && (
                    <InputWithButton
                      ignoreErrors
                      className={styles.examples}
                      variant="withoutButton"
                      name={`example ${j + 1} translation`}
                      label={`example ${j + 1} translation`}
                      onChange={getExamplesChangeHandler(i, j, 'translation')}
                      value={example?.translation || ''}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
