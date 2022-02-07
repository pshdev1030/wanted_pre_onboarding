import React, { useCallback } from "react";
import styled from "@emotion/styled";

interface ModalType {
  children: React.ReactNode;
  isOpen: boolean;
  onCloseModal: () => void;
}
const Modal = ({ children, isOpen, onCloseModal }: ModalType) => {
  const onClickModalContent = useCallback((e: any) => {
    e.stopPropagation();
  }, []);
  return (
    <ModalWrapper>
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
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.div``;

const ModalBackground = styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9999;
  background: #f3f3f3;
  width: 30%;
  height: 15%;
  border-radius: 30px;
  transform: translate(-50%, -50%);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;

  & button {
    all: unset;
    cursor: pointer;
    padding: 5px;
    font-size: 20px;
  }
`;
