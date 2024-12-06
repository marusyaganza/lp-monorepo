import React, {
  useState,
  ChangeEvent,
  MouseEventHandler,
  PropsWithChildren
} from 'react';
import { cn } from '../../utils/classnames';
import { InputWithButton } from '../InputWithButton/InputWithButton';

import styles from './ArrayInput.module.css';
import { isNotEmptyString } from '../../types/typeGuards';

export interface ArrayInputProps {
  /**InputWithButton name prop */
  name: string;
  /**InputWithButton label prop */
  label?: string;
  /**InputWithButton variant prop */
  variant?: 'dark' | 'purple';
  onChange: (value: string[]) => void;
  initialValue?: string[];
  /**additional styling */
  className?: string;
  showOrderButtons?: boolean;
  errorText?: string;
  dataCy?: string;
}
/**component ArrayInput */
export const ArrayInput = ({
  name,
  label,
  className,
  onChange,
  variant = 'purple',
  children,
  initialValue,
  showOrderButtons,
  errorText,
  dataCy
}: PropsWithChildren<ArrayInputProps>) => {
  const [values, setValues] = useState<string[]>(
    initialValue && initialValue.length ? initialValue : ['']
  );

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e?.target?.value;
    const elementIndex = Number.parseInt(e?.target?.name?.split('-')?.[1]);
    const newVals = [...values];
    if (typeof elementIndex === 'number') {
      newVals[elementIndex] = value;
      setValues(newVals);
      onChange(newVals.filter(isNotEmptyString));
    }
  };

  const addInputHandler = () => {
    setValues(prev => [...prev, '']);
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
      onChange(newVals.filter(Boolean));
    };
  };

  return (
    <div className={cn(className, styles.arrayInput)}>
      {values.map((value, i) => {
        const isLast = i === values.length - 1;
        return (
          <div key={`${name}-${i}`}>
            <InputWithButton
              dataCy={dataCy}
              errorText={errorText}
              showAdditionalControls={showOrderButtons && values.length > 1}
              upButtonProps={{
                onClick: getDefOrderHandler(i, 'up'),
                disabled: i === 0
              }}
              downButtonProps={{
                onClick: getDefOrderHandler(i, 'down'),
                disabled: isLast
              }}
              label={`${label} ${i + 1}`}
              onButtonClick={
                isLast ? addInputHandler : getRemoveInputHandler(i)
              }
              buttonText={isLast ? 'Add new input' : 'Remove input'}
              value={value}
              variant={variant}
              name={`${name}-${i}`}
              onChange={changeHandler}
              buttonIconId={isLast ? 'plus' : 'minus'}
            />
            {children}
          </div>
        );
      })}
    </div>
  );
};
