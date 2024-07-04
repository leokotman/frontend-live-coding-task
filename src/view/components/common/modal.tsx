import { FC, ReactNode } from 'react';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '20%',
    left: '20%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface ModalProps {
  children: ReactNode;
  onClose(): void;
  isOpen: boolean;
}

export const Modal: FC<ModalProps> = ({ children, onClose, isOpen }) => {
  return (
    <div>
      <ReactModal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <button type="button" onClick={onClose}>
          X
        </button>
        <div>{children}</div>
      </ReactModal>
    </div>
  );
};
