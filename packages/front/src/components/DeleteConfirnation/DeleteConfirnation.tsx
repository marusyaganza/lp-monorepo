import React, { PropsWithChildren } from 'react';
import { Button } from '@lp/ui';
import styles from './DeleteConfirnation.module.css';

export interface DeleteConfirnationProps {
  onDelete: () => void;
  onCancel: () => void;
}

export const DeleteConfirnation = ({
  children,
  onDelete,
  onCancel
}: PropsWithChildren<DeleteConfirnationProps>) => {
  return (
    <section className={styles.modalContent}>
      {children}
      <div className={styles.buttons}>
        <Button data-cy="yes-btn" variant="danger" onClick={onDelete}>
          Delete
        </Button>
        <Button data-cy="no-btn" variant="tertiary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </section>
  );
};
