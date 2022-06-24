import React, { InputHTMLAttributes, useEffect } from 'react';
import {validatorType} from '../../utils/validators';

import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    validators?: validatorType[],
    errorText?: string,
    isValid?: boolean,
}
//TODO 
// required fields style
// handle loading state
export const Input = ({name, label, errorText, isValid=true, className,...rest}: InputProps) => {
    return (
        <div className={`${className} inputContainer`}>
            {label && <label htmlFor={name} className='label'>{label}</label>}
            <input className={`${isValid ? '' : 'error'} input`} name={name} {...rest} />
            <p  aria-hidden={isValid} role="status"className={`${isValid ? '' : 'errorTextActive'} errorText`}>{errorText}</p>
        </div>
    );
}
