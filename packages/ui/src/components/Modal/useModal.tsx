import React, { useRef, useCallback, PropsWithChildren } from 'react';
import { Modal } from './Modal';

export type ModalProps = {
  className?: string;
};

export const useModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeModal = useCallback(() => {
    modalRef.current?.close();
    console.log('ref', modalRef.current);
  }, [modalRef]);

  const openModal = useCallback(() => {
    modalRef.current?.showModal();
  }, [modalRef]);

  return {
    Modal: ({ ...props }: PropsWithChildren<ModalProps>) => (
      <Modal ref={modalRef} onClose={closeModal} {...props} />
    ),
    closeModal,
    openModal
  };
};
