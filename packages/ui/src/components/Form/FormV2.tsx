/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FormHTMLAttributes, useState } from 'react';

import { Input, InputProps } from '../Input/Input';
import { ArrayInput, ArrayInputProps } from '../ArrayInput/ArrayInput';
import { Button } from '../Button/Button';
import { validate } from '../../utils/validators';
import { cn } from '../../utils/classnames';

export interface FormV2Props extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  buttonText?: string;
  fields: InputProps[];
  initialValues: Record<string, string>;
  onFormSubmit: (values: Record<string, string>) => void;
  isLoading?: boolean;
}

export const FormV2 = ({
  className,
  fields,
  onFormSubmit,
  buttonText = 'Submit',
  isLoading,
  initialValues,
  ...rest
}: FormV2Props) => {
  const componentsMap = {
    text: Input,
    array: ArrayInput
  };

  const [errors, setErrors] = useState<string[]>([]);
  const [values, setValues] = useState<Record<string, string>>(initialValues);

  // const submitHandler = (evt: FormV2Event<HTMLFormV2Element>) => {
  //   evt.preventDefault();
  //   //TODO what is correct type for this? That contains all fields names?
  //   const values: Record<string, string> = {};
  //   const errorsArr: string[] = [];

  //   fields.forEach(field => {
  //     const { name } = field;
  //     // TODO fix this type problem
  //     // @ts-ignore
  //     const value = evt?.target?.[name]?.value || '';

  //     if (!validate(value, field.validators || [])) {
  //       errorsArr.push(name);
  //     }

  //     if (name === 'repeatPassword' && values.password !== value) {
  //       errorsArr.push('repeatPassword');
  //     }

  //     if (name !== 'repeatPassword') {
  //       values[name] = value;
  //     }
  //   });

  //   if (!errorsArr.length) {
  //     onFormV2Submit(values);
  //   }
  //   setErrors(errorsArr);
  // };

  const submitHandler = () => {
    onFormSubmit(values);
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
