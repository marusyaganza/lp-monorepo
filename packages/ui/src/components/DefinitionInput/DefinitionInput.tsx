import React, { MouseEventHandler, useState } from 'react';
import { cn } from '../../utils/classnames';

import { ArrayInput } from '../ArrayInput/ArrayInput';
import { DefinitionType } from '@lp/types';
import { InputWithButton } from '../InputWithButton/InputWithButton';

import styles from './DefinitionInput.module.css';

export interface DefinitionInputProps {
  /**DefinitionInput prop */
  initialValue?: DefinitionType[];
  onChange: (value: DefinitionType[]) => void;
  errorText?: string;
  /**additional styling */
  className?: string;
}

/**Component description goes here */
export const DefinitionInput = ({
  initialValue,
  className,
  onChange,
  errorText
}: DefinitionInputProps) => {
  const defaultInitialValues = [{ def: '', examples: [] }];
  const [values, setValues] = useState<DefinitionType[]>(
    initialValue || defaultInitialValues
  );

  const getExamplesChangeHandler = (parentIndex: number) => {
    const changeHandler = (val: string[]) => {
      const newVals = [...values];
      newVals[parentIndex].examples = val;
      setValues([...newVals]);
      onChange(newVals.filter(Boolean));
    };
    return changeHandler;
  };

  const getDefinitionChangeHandler = (index: number) => {
    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newVals = [...values];
      newVals[index].def = event?.target?.value;
      setValues([...newVals]);
      onChange(newVals.filter(Boolean));
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

  const addButtonClickHandler = () => {
    setValues(prev => [...prev, defaultInitialValues[0]]);
  };

  return (
    <div className={cn(className, styles.template)}>
      {values.map((value, i) => {
        const isLast = i === values.length - 1;
        return (
          <>
            <InputWithButton
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
            <ArrayInput
              name="example"
              variant="dark"
              label="example"
              className={styles.examples}
              onChange={getExamplesChangeHandler(i)}
            />
          </>
        );
      })}
    </div>
  );
};
