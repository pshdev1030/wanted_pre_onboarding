import styled from "@emotion/styled";
export const ModalBackground = styled.div`
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

export const ModalContent = styled.div`
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

export const ButtonWrapper = styled.div`
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
