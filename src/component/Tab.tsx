import React from "react";
import { TabContentWrapper, TabHeaderWrapper, TabWrapper } from "../style/Tab";
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
