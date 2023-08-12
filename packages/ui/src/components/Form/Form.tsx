import React, { FormEventHandler, useState } from 'react';

import { Input, InputProps } from '../Input/Input';
import { Button } from '../Button/Button';
import { validate } from '../../utils/validators';
import { cn } from '../../utils/classnames';

export type FormField = InputProps;

export interface FormProps<T extends Record<string, string | null>> {
  /**additional styling */
  className?: string;
  buttonText?: string;
  fields: FormField[];
  /**native html id property */
  id?: string;
  onFormSubmit: (values: T) => void;
  isLoading?: boolean;
}

export function Form<T extends Record<string, string | null>>({
  className,
  fields,
  onFormSubmit,
  buttonText = 'Submit',
  isLoading,
  ...rest
}: FormProps<T>) {
  const [errors, setErrors] = useState<string[]>([]);

  const submitHandler: FormEventHandler<HTMLFormElement> = evt => {
    evt.preventDefault();
    const values: T = {} as T;
    const errorsArr: string[] = [];

    fields.forEach(field => {
      const name: keyof T & string = field.name;
      const target = evt.target as HTMLFormElement;
      const value = target[name].value! || '';
      if (!value || !validate(value, field.validators || [])) {
        errorsArr.push(name);
      }

      if (name === 'repeatPassword' && values.password !== value) {
        errorsArr.push('repeatPassword');
      }

      if (name !== 'repeatPassword') {
        values[name] = value;
      }
    });

    if (!errorsArr.length) {
      onFormSubmit(values);
    }
    setErrors(errorsArr);
  };

  const renderFields = () => {
    return fields.map((field, i) => {
      return (
        <Input
          autoFocus={i === 0}
          {...field}
          key={field.name}
          isValid={!errors.some(e => e === field.name)}
        />
      );
    });
  };

  return (
    <form onSubmit={submitHandler} className={cn(className)} {...rest}>
      {renderFields()}
      <Button type="submit" isLoading={isLoading}>
        {buttonText}
      </Button>
    </form>
  );
}
