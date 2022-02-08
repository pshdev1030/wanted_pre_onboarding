import React from "react";
import {
  ClickToEditElement,
  ClickToEditInput,
  ClickToEditP,
} from "../style/ClickToEdit";

interface ClickToEditComponentType {
  isNameEditable: boolean;
  isAgeEditable: boolean;
  name: string;
  age: string;
  changeIsNameEditable: () => void;
  changeIsAgeEditable: () => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAge: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClickToEdit = ({
  isNameEditable,
  isAgeEditable,
  changeIsNameEditable,
  onChangeName,
  changeIsAgeEditable,
  onChangeAge,
  name,
  age,
}: ClickToEditComponentType) => {
  return (
    <div>
      <ClickToEditElement>
        <p className="label">이름</p>
        {isNameEditable ? (
          <form onSubmit={changeIsNameEditable}>
            <ClickToEditInput
              value={name}
              onChange={onChangeName}
              onDoubleClick={changeIsNameEditable}
            ></ClickToEditInput>
          </form>
        ) : (
          <ClickToEditP onDoubleClick={changeIsNameEditable}>
            {name === "" ? "Double click to enter the value." : name}
          </ClickToEditP>
        )}
      </ClickToEditElement>
      <ClickToEditElement>
        <p className="label">나이</p>
        {isAgeEditable ? (
          <form onSubmit={changeIsAgeEditable}>
            <ClickToEditInput
              type="number"
              value={age}
              onChange={onChangeAge}
              onDoubleClick={changeIsAgeEditable}
            ></ClickToEditInput>
          </form>
        ) : (
          <ClickToEditP onDoubleClick={changeIsAgeEditable}>
            {age === "" ? "Double click to enter the value." : age}
          </ClickToEditP>
        )}
      </ClickToEditElement>
    </div>
  );
};
export default ClickToEdit;
