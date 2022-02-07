import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import Modal from "./components/Modal";
import Tab from "./components/Tab";
import Toggle from "./components/Toggle";

function App() {
  const [toggleOn, setToggleOn] = useState<boolean>(false);
  const onClickToggleButton = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setToggleOn(e.target.checked);
    },
    [toggleOn]
  );

  const [onOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);
  const onClickCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <>
      <>
        <h1>Toggle</h1>
        <Toggle onChange={onClickToggleButton} />
        <div>{toggleOn ? "Toggle Switch ON" : "Toggle Switch OFF"}</div>
      </>
      <>
        <h1>Modal</h1>
        <ModalOpenButton onClick={onClickOpenModal}>
          Open Modal!
        </ModalOpenButton>
      </>
      <>
        <Tab />
      </>
      <Modal isOpen={onOpenModal} onCloseModal={onClickCloseModal}>
        <ModalDummyContent>Hello Code State!</ModalDummyContent>
      </Modal>
    </>
  );
}

export default App;

const ModalOpenButton = styled.button`
  all: unset;
  padding: 20px 40px;
  border-radius: 30px;
  cursor: pointer;
  color: white;
  background: #8b00ff;
`;

const ModalDummyContent = styled.div`
  color: #8b00ff;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;
