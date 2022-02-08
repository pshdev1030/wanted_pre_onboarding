import styled from "@emotion/styled";
import React, { useCallback, useRef, useState } from "react";
import AutoComplete from "./component/AutoComplete";
import ClickToEdit from "./component/ClickToEdit";
import Modal from "./component/Modal";
import Tab from "./component/Tab";
import Tag from "./component/Tag";
import Template from "./component/Template";
import Toggle from "./component/Toggle";
import { tabsType } from "./types/tab";
import { tagsType } from "./types/tags";

function App() {
  // ToggleSwith
  const [toggleOn, setToggleOn] = useState<boolean>(false);
  const onClickToggleButton = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setToggleOn(e.target.checked);
    },
    [toggleOn]
  );

  // Modal
  const [onOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);
  const onClickCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  // Tag
  const [tagValue, setTagValue] = useState<string>("");
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTagValue(e.target.value);
    },
    [tagValue]
  );
  const [tags, setTags] = useState<[] | tagsType[]>([]);
  const tagIdRef = useRef<number>(0);

  const addTag = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (tagValue === "") return;
      const newTag = { val: tagValue, id: tagIdRef.current++ };
      const newTags = [...tags, newTag];
      setTags(newTags);
      setTagValue("");
    },
    [tags, tagValue]
  );
  const removeTag = useCallback(
    (id: number) => {
      const newTags = tags.filter((tag) => tag.id !== id);
      setTags(newTags);
    },
    [tags]
  );

  // ClickToEdit

  const [name, setName] = useState<string>("");
  const [isNameEditable, setisNameEditable] = useState<boolean>(true);
  const changeIsNameEditable = useCallback(() => {
    setisNameEditable((prev) => !prev);
  }, [isNameEditable]);
  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const [age, setAge] = useState<string>("");
  const [isAgeEditable, setisAgeEditable] = useState<boolean>(true);
  const changeIsAgeEditable = useCallback(() => {
    setisAgeEditable((prev) => !prev);
  }, [isAgeEditable]);
  const onChangeAge = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  }, []);

  // Tabs

  const [tabsArray, setTabsArray] = useState<tabsType[]>([
    { id: 1, title: "Tab1", content: "Tab menu 1", active: true },
    { id: 2, title: "Tab2", content: "Tab menu 2", active: false },
    { id: 3, title: "Tab3", content: "Tab menu 3", active: false },
  ]);

  const onClickTabs = useCallback(
    (id) => {
      const prevIndex = tabsArray.findIndex((tab) => tab.active === true);
      const nextIndex = tabsArray.findIndex((tab) => tab.id === id);
      const newTabsArray = tabsArray.slice();
      newTabsArray[prevIndex].active = false;
      newTabsArray[nextIndex].active = true;
      setTabsArray(newTabsArray);
    },
    [tabsArray]
  );

  // AutoComplete
  const autoCompleteDatas = useRef<string[]>([
    "A급중고",
    "B급중고",
    "antique",
    "Vintage",
    "Refresh",
    "React",
    "Frontend",
    "Backend",
    "nestjs",
    "express",
    "styled component",
  ]);
  const [searchValue, setSearchValue] = useState<string>("");
  const onChangeSearchValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  return (
    <AppWrapper>
      <Template>
        <h1>Toggle</h1>
        <Toggle onChange={onClickToggleButton} />
        <div>{toggleOn ? "Toggle Switch ON" : "Toggle Switch OFF"}</div>
      </Template>
      <Template>
        <h1>Modal</h1>
        <ModalOpenButton onClick={onClickOpenModal}>
          Open Modal!
        </ModalOpenButton>
      </Template>
      <Template>
        <h1>Tag</h1>
        <Tag
          addTag={addTag}
          removeTag={removeTag}
          tags={tags}
          onChange={onChange}
          tagValue={tagValue}
        />
      </Template>
      <Template>
        <h1>Tab</h1>
        <Tab tabsArray={tabsArray} onClickTabs={onClickTabs} />
      </Template>
      <Template>
        <h1>Click To Edit</h1>
        <ClickToEdit
          isNameEditable={isNameEditable}
          name={name}
          age={age}
          isAgeEditable={isAgeEditable}
          changeIsNameEditable={changeIsNameEditable}
          changeIsAgeEditable={changeIsAgeEditable}
          onChangeAge={onChangeAge}
          onChangeName={onChangeName}
        />
        <ClickToEditDataHolder>
          이름 {name} 나이 {age}
        </ClickToEditDataHolder>
      </Template>
      <Template>
        <h1>Auto Complete</h1>
        <AutoComplete
          autoCompleteDatas={autoCompleteDatas.current}
          searchValue={searchValue}
          onChange={onChangeSearchValue}
          setSearchValue={setSearchValue}
        />
      </Template>
      <Modal isOpen={onOpenModal} onCloseModal={onClickCloseModal}>
        <ModalDummyContent>Hello Code State!</ModalDummyContent>
      </Modal>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ModalOpenButton = styled.button`
  all: unset;
  padding: 20px 40px;
  border-radius: 30px;
  width: 100px;
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

const ClickToEditDataHolder = styled.div`
  text-align: center;
`;
