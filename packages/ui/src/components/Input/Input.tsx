import React, { InputHTMLAttributes } from 'react';
import { validatorType } from '../../utils/validators';
import { cn } from '../../utils/classnames';

import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**name attribute of native HTML input element */
  name: string;
  /**input's label */
  label: string;
  /**array of validators */
  validators?: validatorType[];
  /**test that is shown if input is invalid */
  errorText?: string;
  /**defines if input has valid value */
  isValid?: boolean;
}
//TODO
// required fields style
// handle loading state

/**Default text input component  */
export const Input = ({
  name,
  label,
  errorText,
  isValid = true,
  className,
  ...rest
}: InputProps) => {
  return (
    <div
      className={cn(className, 'inputContainer', isValid ? 'incorrect' : '')}
    >
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input className="input" name={name} {...rest} />
      <p aria-hidden={isValid} role="status" className="errorText">
        {errorText}
      </p>
    </div>
  );
};
