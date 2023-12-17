import React from 'react';

import { cn } from '../../utils/classnames';
import styles from './DictionaryEntity.module.css';

export interface DictionaryEntityProps {
  /**Text that might include HTML tags */
  text: string;
  /**additional styling */
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
