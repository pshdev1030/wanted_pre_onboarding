import styled from "@emotion/styled";
import React from "react";
import { tabsType } from "../types/tab";

interface TabComponentType {
  tabsArray: tabsType[];
  onClickTabs: (id: number) => void;
}

const Tab = ({ tabsArray, onClickTabs }: TabComponentType) => {
  return (
    <TabWrapper>
      <TabHeaderWrapper>
        {tabsArray.map((tab) => (
          <div
            className={tab.active ? "active" : ""}
            key={tab.id}
            onClick={() => onClickTabs(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </TabHeaderWrapper>
      <TabContentWrapper>
        {tabsArray.map((tab) => (
          <div className={tab.active ? "active" : ""} key={tab.id}>
            {tab.content}
          </div>
        ))}
      </TabContentWrapper>
    </TabWrapper>
  );
};

export default Tab;

const TabWrapper = styled.div`
  width: 400px;
`;

const TabHeaderWrapper = styled.div`
  display: flex;
  & > div {
    width: calc(100% / 3);
    background: #ccc;
    padding: 20px;
    cursor: pointer;
  }
  & .active {
    background: #8b00ff;
  }
`;
const TabContentWrapper = styled.div`
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
