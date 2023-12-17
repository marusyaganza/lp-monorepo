import React from 'react';
import { cn } from '../../utils/classnames';

import styles from './Template.module.css';

export interface TemplateProps {
  /**Template prop */
  prop: string;
  /**additional styling */
  className?: string;
}
/**Component description goes here */
export const Template = ({ prop, className }: TemplateProps) => {
  return <div className={cn(className, styles.template)}>Template {prop}</div>;
};
