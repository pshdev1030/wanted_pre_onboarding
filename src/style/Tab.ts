import styled from "@emotion/styled";
export const TabWrapper = styled.div`
  width: 400px;
`;

interface TabHeaderWrapperType {
  size: number;
}

export const TabHeaderWrapper = styled.div<TabHeaderWrapperType>`
  display: flex;
  & > div {
    width: ${(props) => `calc(100%/${props.size})`};
    background: #ccc;
    padding: 20px;
    cursor: pointer;
  }
  & .active {
    background: #8b00ff;
  }
`;
export const TabContentWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    position: absolute;
    opacity: 0;
  }

  & > .active {
    opacity: 1;
  }
`;
