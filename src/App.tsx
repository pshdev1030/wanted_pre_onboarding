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
        <button onClick={onClickOpenModal}>Open Modal!</button>
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

const ModalDummyContent = styled.div`
  color: #8b00ff;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;
