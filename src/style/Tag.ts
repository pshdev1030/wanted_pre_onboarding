import styled from "@emotion/styled";
export const TagContentWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

export const TagWrapper = styled.div`
  background-color: #8b00ff;
  border-radius: 10px;
  padding: 5px;
  margin-right: 10px;
  & > button {
    all: unset;
    cursor: pointer;
    padding: 3px;
    margin-left: 5px;
    border-radius: 10px;
    background: #f3f3f3;
  }
`;

export const TagInput = styled.input`
  all: unset;
  display: inline-block;
  padding: 10px;
`;
