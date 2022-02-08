import styled from "@emotion/styled";
import React, { useMemo } from "react";

interface AutoCompleteComponentType {
  autoCompleteDatas: string[];
  searchValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const AutoComplete = ({
  autoCompleteDatas,
  searchValue,
  onChange,
  setSearchValue,
}: AutoCompleteComponentType) => {
  const result = useMemo(() => {
    if (searchValue.trim() === "") return [];
    else
      return autoCompleteDatas.filter(
        (data) => data.toUpperCase().indexOf(searchValue.toUpperCase()) !== -1
      );
  }, [searchValue]);
  return (
    <AutoCompleteWrapper>
      <InputWrapper>
        <input value={searchValue} onChange={onChange}></input>
        <button onClick={() => setSearchValue("")}>×</button>
      </InputWrapper>
      <CompletedDatasWrapper>
        {result.length !== 1 &&
          result.map((data, index) => (
            <CompletedData key={index} onClick={() => setSearchValue(data)}>
              {data}
            </CompletedData>
          ))}
      </CompletedDatasWrapper>
    </AutoCompleteWrapper>
  );
};

export default AutoComplete;

export const AutoCompleteWrapper = styled.div`
  width: max-content;
  position: relative;
`;

export const InputWrapper = styled.div`
  border: 2px solid #ccc;

  & input {
    all: unset;
    line-height: 100%;
    font-size: 20px;
    padding: 5px;
  }
  & button {
    all: unset;
    padding: 10px;
    font-size: 20px;
    cursor: pointer;
  }
`;

export const CompletedDatasWrapper = styled.div`
  box-shadow: 0 5px 5px 5px #ccc;
  border-bottom-left-radius: 10px;
  position: absolute;
  width: 100%;
  border-bottom-right-radius: 10px;
`;
export const CompletedData = styled.div`
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;

  &:hover {
    background: #ccc;
  }
`;
