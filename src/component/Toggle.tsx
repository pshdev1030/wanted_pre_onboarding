import React from "react";
import { ToggleWrapper } from "../style/Toggle";

interface ToggleComponentType {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toggle = ({ onChange }: ToggleComponentType) => {
  return (
    <>
      <ToggleWrapper>
        <label>
          <input type="checkbox" onChange={onChange}></input>
          <span className="slider"></span>
        </label>
      </ToggleWrapper>
    </>
  );
};

export default Toggle;
