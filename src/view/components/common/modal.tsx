import { FC, ReactNode, useState } from 'react';
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

interface Props {
  children: ReactNode;
  onClose(): void;
  isOpen: boolean;
}

export const Modal: FC<Props> = ({ children, onClose, isOpen }: Props) => {
  const [modalIsOpen, setIsOpen] = useState(isOpen);

  function closeModal() {
    setIsOpen(false);
    onClose();
  }

  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button type="button" onClick={closeModal}>
          X
        </button>
        <div>{children}</div>
      </ReactModal>
    </div>
  );
};
