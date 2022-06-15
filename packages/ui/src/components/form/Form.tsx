import React, {PropsWithChildren, FormHTMLAttributes, FormEvent, useState, useEffect} from 'react';

import { Input, InputProps } from '../Input/Input';
import { Button } from '../button/Button';
import { validate } from '../../utils/validators';
import './Form.css';


interface FormProps extends FormHTMLAttributes<HTMLFormElement>{
    className?: string,
    fields: InputProps[],
    buttonText?: string,
    onFormSubmit: (values: Record<string, string>) => void 
}

export const Form = ({className, children, fields, onFormSubmit, buttonText, ...rest} : PropsWithChildren<FormProps>) => {
  
  
  
  const [errors, setErrors] = useState<string[]>([]);
  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    //TODO what is correct type for this? That contains all fields names?
    const values: Record<string, string> = {};
    const errorsArr: string[] = [];
    
    fields.forEach(field => {
      const {name} = field;
      // TODO fix this type problem
      // @ts-ignore
      const value = evt?.target?.[name]?.value || ''
      if (!validate(value, field.validators || [])) {
          errorsArr.push(name);
        }
        values[name] = value;
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
        <form onSubmit={submitHandler} className={`${className}`} {...rest}>
          {renderFields()}
            <Button type="submit" className='submitButton'>
              {buttonText || 'Submit'}
            </Button>
        </form>
      );
    };