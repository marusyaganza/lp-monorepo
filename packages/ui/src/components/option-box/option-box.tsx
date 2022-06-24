import React, {useState} from 'react';
import { DictionaryEntity } from '../dictionary-entity/dictionary-entity';
import { cn } from '../../utils/classnames';
import  './option-box.css';

interface OptionBoxProps  {
  options: string[],
  value?: string,
  className?: string,
  isError?: boolean,
  onChange: (val: string) => void,
  type: 'radio' | 'checkbox'
}

export const OptionBox = React.memo(
  ({ options, value, onChange, className, isError, type }: OptionBoxProps ) => {
    // @ts-ignore
    const changeHandler = e => {
      const currValue = e.target.value;
      if (type === 'checkbox' && value) {
        let newValues = [...value];
        if (!value?.includes(currValue)) {
          newValues.push(currValue);
        } else {
          newValues = newValues.filter(item => item !== currValue);
        }
           // @ts-ignore
        // const result = newValues.sort((a, b) => a - b).join('');
        onChange(result);
      } else {
        onChange(currValue);
      }
    };

    return (
      <ul className={cn('optionBox', className)}>
        {options.map((option, i) => {
          const checked = value?.includes(option);
          return (
            <li key={option} className='box'>
              <label
                className={cn(
                 'option',
                 checked ? 'checked' : '',
                 isError ? 'error' : ''
                )}
                htmlFor={option}
              >
                <input
                  autoFocus
                  className="optionInput"
                  onChange={changeHandler}
                  type={type}
                  checked={checked}
                  id={option}
                  name="optionBox"
                  value={option}
                  // value={i}
                />
                <DictionaryEntity text={option} />
              </label>
            </li>
          );
        })}
      </ul>
    );
  }
);
