import React from 'react';
import { useModal } from './useModal';
import { Modal as ModalComponent, ModalProps } from './Modal';
import { Button } from '../Button/Button';

export default {
  title: 'Modal',
  component: ModalComponent,
  parameters: {
    actions: { disable: true }
  }
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
