import React from "react";
import styled from "@emotion/styled";

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

const ToggleWrapper = styled.div`
  & label {
    position: relative;
    width: 120px;
    height: 60px;
    display: inline-block;
  }

  & input {
    display: none;
  }

  & .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 30px;
    transition: 0.4s;
  }

  & .slider:before {
    position: absolute;
    content: "";
    width: 50px;
    height: 50px;
    left: 5px;
    bottom: 5px;
    background: white;
    border-radius: 50px;
    transition: 0.4s;
  }

  & input:checked + .slider {
    background-color: #8b00ff;
  }
  & input:checked + .slider:before {
    transform: translateX(50px);
  }
`;

export default Toggle;
