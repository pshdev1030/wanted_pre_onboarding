import React, { useCallback } from "react";
import { ButtonWrapper, ModalBackground, ModalContent } from "../style/Modal";

interface ModalComponentType {
  children: React.ReactNode;
  isOpen: boolean;
  onCloseModal: () => void;
}
const Modal = ({ children, isOpen, onCloseModal }: ModalComponentType) => {
  const onClickModalContent = useCallback((e: any) => {
    e.stopPropagation();
  }, []);
  return (
    <div>
      {isOpen && (
        <>
          <ModalBackground />
          <ModalContent onClick={onClickModalContent}>
            <ButtonWrapper>
              <button onClick={onCloseModal}>×</button>
            </ButtonWrapper>
            {children}
          </ModalContent>
        </>
      )}
    </div>
  );
};

export default Modal;
