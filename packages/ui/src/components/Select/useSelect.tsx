import React, { useState, PropsWithChildren, useCallback } from 'react';
import { Option, OptionProps as OptionPropsType } from './Option';
import { Select, SelectProps as SelectPropsType } from './Select';

export type OptionProps<T extends string> = Omit<
  PropsWithChildren<OptionPropsType<T>>,
  'onChange' | 'isChecked'
>;

export type SelectProps<T extends string> = PropsWithChildren<
  SelectPropsType<T>
>;

export function useSelect<T extends string>() {
  const [currentValue, setCurrentValue] = useState<T>();

  const handleChange = useCallback((cb: (val: T) => void) => {
    return function (val: T) {
      if (val) {
        if (cb) {
          cb(val);
        }
        setCurrentValue(val);
      }
    };
  }, []);

  return [
    {
      Option: (args: OptionProps<T>) => {
        return (
          <Option
            {...args}
            onChange={setCurrentValue}
            isChecked={args.value === currentValue}
          />
        );
      },
      Select: (args: SelectProps<T>) => {
        return (
          <Select
            {...args}
            value={currentValue || args.value}
            onChange={handleChange(args.onChange)}
          />
        );
      }
    }
  ];
}
