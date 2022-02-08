import styled from "@emotion/styled";

export const ClickToEditElement = styled.div`
  display: flex;
  align-items: center;

  & .label {
    margin-right: 10px;
  }
`;

export const ClickToEditInput = styled.input`
  padding: 15px;
  font-size: 15px;
  border-radius: 20px;
  &:focus {
    outline: 2px solid #005566;
  }
`;

export const ClickToEditP = styled.p`
  min-width: 200px;
`;
