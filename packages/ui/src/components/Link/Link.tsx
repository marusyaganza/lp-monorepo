import React from 'react';
import { Link as CoreLink, LinkProps as CoreLinkProps } from 'react-router-dom';
import { cn } from '../../utils/classnames';

import styles from './Link.module.css';

export interface LinkProps extends CoreLinkProps {
  /**determines the look of the link */
  variant?: 'link' | 'button';
  /**additional styling */
  className?: string;
}
/**styled react router 6 Link */
export const Link = ({
  className,
  children,
  variant = 'link',
  ...rest
}: LinkProps) => {
  return (
    <CoreLink {...rest} className={cn(className, styles[variant])}>
      {children}
    </CoreLink>
  );
};
