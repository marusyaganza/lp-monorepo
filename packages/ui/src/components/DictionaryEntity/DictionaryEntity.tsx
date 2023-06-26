import React from 'react';

import { cn } from '../../utils/classnames';
import styles from './DictionaryEntity.module.css';

export interface DictionaryEntityProps {
  text: string;
  className?: string;
}

export const DictionaryEntity = ({
  text,
  className
}: DictionaryEntityProps) => {
  return (
    <span
      className={cn(styles.dictionaryEntity, className)}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};
