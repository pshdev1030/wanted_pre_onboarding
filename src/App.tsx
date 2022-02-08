import styled from "@emotion/styled";
import React, { useCallback, useRef, useState } from "react";
import ClickToEdit from "./component/ClickToEdit";
import Modal from "./component/Modal";
import Tab from "./component/Tab";
import Tag from "./component/Tag";
import Toggle from "./component/Toggle";
import { tagsType } from "./types/tags";

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
        <h1>Tag</h1>
        <Tag
          addTag={addTag}
          removeTag={removeTag}
          tags={tags}
          onChange={onChange}
          tagValue={tagValue}
        />
      </>
      <>
        <h1>Tab</h1>
        <Tab />
      </>
      <>
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
        <div>
          이름 {name} 나이 {age}
        </div>
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
