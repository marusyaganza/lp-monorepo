import React, {PropsWithChildren} from 'react';
import  './Button.css';

type ButtonProps = {
    color?: 'primary' | 'secodary';
    size?: 'S' | 'M' | 'L';
}

export const Button = ({children, color, size}: PropsWithChildren<ButtonProps>) => {
 return (
     <button className='button'>{children}</button>
 )
};