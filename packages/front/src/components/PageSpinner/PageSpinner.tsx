import React from 'react';
import { Spinner } from '@lp/ui';
import styles from './PageSpinner.module.css';

export const PageSpinner = () => {
  return (
    <div className={styles.container}>
      <Spinner />
    </div>
  );
};
