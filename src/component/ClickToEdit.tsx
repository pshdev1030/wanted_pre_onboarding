import styled from "@emotion/styled";
import React from "react";

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

const ClickToEditElement = styled.div`
  display: flex;
  align-items: center;

  & .label {
    margin-right: 10px;
  }
`;

const ClickToEditInput = styled.input`
  padding: 15px;
  font-size: 15px;
  border-radius: 20px;
  &:focus {
    outline: 2px solid #005566;
  }
`;

const ClickToEditP = styled.p`
  min-width: 200px;
`;
