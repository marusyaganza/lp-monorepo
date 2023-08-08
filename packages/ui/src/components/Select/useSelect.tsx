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

export function useSelect<T extends string>({
  onChange,
  initialValue
}: {
  onChange: (value: T) => void;
  initialValue?: T;
}) {
  const [currentValue, setCurrentValue] = useState<T | undefined>(initialValue);

  const handleChange = useCallback(
    (val: T) => {
      if (onChange) {
        onChange(val);
      }
      setCurrentValue(val);
    },
    [onChange]
  );

  return {
    Option: (args: OptionProps<T>) => {
      return (
        <Option
          {...args}
          onChange={handleChange}
          isChecked={args.value === currentValue}
        />
      );
    },
    Select: (args: SelectProps<T>) => {
      return <Select {...args} value={currentValue || args.value} />;
    },
    setValue: setCurrentValue
  };
}
