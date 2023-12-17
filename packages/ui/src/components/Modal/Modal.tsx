import React, { PropsWithChildren, forwardRef } from 'react';
import { Button } from '../Button/Button';
import { cn } from '../../utils/classnames';

import styles from './Modal.module.css';

export interface ModalProps {
  /**additional styling */
  className?: string;
  onClose?: () => void;
}
/**Modal Component based on HTML dialog element */
export const Modal = forwardRef<
  HTMLDialogElement,
  PropsWithChildren<ModalProps>
>(({ className, children, onClose }, ref) => {
  return (
    <dialog ref={ref} className={cn(className, styles.modal)}>
      <Button
        className={styles.closeButton}
        onClick={onClose}
        variant="icon"
        iconId="close"
        iconHeight={20}
        iconWidth={20}
      >
        Close modal
      </Button>
      {children}
    </dialog>
  );
});

Modal.displayName = 'Modal';
