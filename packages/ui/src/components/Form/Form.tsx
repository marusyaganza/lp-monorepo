/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FormHTMLAttributes, FormEvent, useState } from 'react';

import { Input, InputProps } from '../Input/Input';
import { Button } from '../Button/Button';
import { validate } from '../../utils/validators';
import { cn } from '../../utils/classnames';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  buttonText?: string;
  fields: InputProps[];
  // TODO: make it generic
  onFormSubmit: (values: any) => void;
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

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    //TODO what is correct type for this? That contains all fields names?
    const values: Record<string, string> = {};
    const errorsArr: string[] = [];

    fields.forEach(field => {
      const { name } = field;
      // TODO fix this type problem
      // @ts-ignore
      const value = evt?.target?.[name]?.value || '';

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
