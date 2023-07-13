import React, {
  useState,
  ChangeEvent,
  MouseEventHandler,
  PropsWithChildren
} from 'react';
import { cn } from '../../utils/classnames';
import { InputWithButton } from '../InputWithButton/InputWithButton';

import styles from './ArrayInput.module.css';

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
  ...rest
}: PropsWithChildren<ArrayInputProps>) => {
  const [values, setValues] = useState<string[]>(
    initialValue && initialValue.length ? initialValue : ['']
  );

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e?.target?.value;
    const elementIndex = Number.parseInt(e?.target?.name?.split('-')?.[1]);
    const newVals = values;
    if (typeof elementIndex === 'number') {
      newVals[elementIndex] = value;
      setValues([...newVals]);
      onChange(values.filter(Boolean));
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

  return (
    <div className={cn(className, styles.arrayInput)}>
      {values.map((value, i) => {
        const isLast = i === values.length - 1;
        return (
          <div key={`${name}-${i}`}>
            <InputWithButton
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
              {...rest}
            />
            {children}
          </div>
        );
      })}
    </div>
  );
};
