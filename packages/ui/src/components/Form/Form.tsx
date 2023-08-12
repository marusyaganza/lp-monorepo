import React, { FormEventHandler, useState } from 'react';

import { Input, InputProps } from '../Input/Input';
import { Button } from '../Button/Button';
import { validate } from '../../utils/validators';
import { cn } from '../../utils/classnames';

export type FormField = InputProps;

export interface FormProps {
  /**additional styling */
  className?: string;
  buttonText?: string;
  fields: FormField[];
  /**native html id property */
  id?: string;
  onFormSubmit: (values: Record<string, string>) => void;
  isLoading?: boolean;
}

export const Form = ({
  className,
  fields,
  onFormSubmit,
  buttonText = 'Submit',
  isLoading,
  ...rest
}: FormProps) => {
  const [errors, setErrors] = useState<string[]>([]);

  const submitHandler: FormEventHandler<HTMLFormElement> = evt => {
    evt.preventDefault();
    const values: Record<string, string> = {};
    const errorsArr: string[] = [];

    fields.forEach(field => {
      const { name } = field;
      const target = evt.target as HTMLFormElement;
      const value = target[name]?.value || '';
      if (!validate(value, field.validators || [])) {
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
};
