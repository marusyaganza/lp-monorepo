import React, {HTMLAttributes, PropsWithChildren, MouseEventHandler} from 'react';
import  './Button.css';

interface ButtonProps {
    color?: 'primary' | 'secodary';
    size?: 'S' | 'M' | 'L';
    className?: string,
    type?: 'submit'| 'button' | 'reset',
    disabled?: boolean,
    kind?: 'primary' | 'secondary'
    onClick?: MouseEventHandler
}

export const Button = ({children, color, size, kind='primary', type='button', className, ...rest}: PropsWithChildren<ButtonProps> & HTMLAttributes<HTMLButtonElement>) => {
 return (
     <button type={type} className={`${kind} ${className}`} {...rest}>{children}</button>
 )
};