import React from 'react';
import { useModal } from './useModal';
import { Modal as ModalComponent, ModalProps } from './Modal';
import { Button } from '../Button/Button';
import '../../assets/styles/common-styles.css';

export default {
  title: 'Modal',
  component: ModalComponent
};

export const ModalDefault = (args: ModalProps) => {
  const { Modal, openModal } = useModal();
  return (
    <div className="presentationBox">
      <Button onClick={openModal}>Show modal</Button>

      <Modal className="presentationBox" {...args}>
        <div>
          <p>Modal content</p>
        </div>
      </Modal>
    </div>
  );
};
