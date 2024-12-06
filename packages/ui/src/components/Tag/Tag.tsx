import React, { PropsWithChildren } from 'react';
import { cn } from '../../utils/classnames';

import styles from './Tag.module.css';
import { Icon, IconIdType } from '../Icon/icon';

export interface TagProps {
  /**Tag text */
  text?: string;
  /**Tag color */
  color?: string;
  /**additional styling */
  className?: string;
  dataCy?: string;

  iconId?: IconIdType;
}
/**Component description goes here */
export const Tag = ({
  text,
  color,
  className,
  children,
  dataCy,
  iconId
}: PropsWithChildren<TagProps>) => {
  return (
    <span
      data-cy={dataCy || 'tag'}
      style={{ backgroundColor: color }}
      className={cn(className, styles.tag)}
    >
      {iconId ? (
        <div className={styles.withIcon}>
          <Icon width={15} height={15} id={iconId} /> {text}
        </div>
      ) : (
        text && `#${text}`
      )}
      {children}
    </span>
  );
};
