import styled from "@emotion/styled";

export const AutoCompleteWrapper = styled.div`
  width: max-content;
  position: relative;
`;

export const InputWrapper = styled.div`
  border: 2px solid #ccc;

  & input {
    all: unset;
    line-height: 100%;
    font-size: 20px;
    padding: 5px;
  }
  & button {
    all: unset;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
  }
`;

export const CompletedDatasWrapper = styled.div`
  box-shadow: 0 5px 5px 5px #ccc;
  border-bottom-left-radius: 10px;
  position: absolute;
  width: 100%;
  border-bottom-right-radius: 10px;
  max-height: 150px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const CompletedData = styled.div`
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;

  &:hover {
    background: #ccc;
  }
`;
