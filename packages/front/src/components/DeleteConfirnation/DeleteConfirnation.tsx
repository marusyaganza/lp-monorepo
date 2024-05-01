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
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
        <Button variant="tertiary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </section>
  );
};
