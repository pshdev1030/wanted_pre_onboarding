import React, { useMemo } from "react";
import {
  AutoCompleteWrapper,
  CompletedData,
  CompletedDatasWrapper,
  InputWrapper,
} from "../style/AutoComplete";

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
      {result.length > 1 && (
        <CompletedDatasWrapper>
          {result.map((data, index) => (
            <CompletedData key={index} onClick={() => setSearchValue(data)}>
              {data}
            </CompletedData>
          ))}
        </CompletedDatasWrapper>
      )}
    </AutoCompleteWrapper>
  );
};

export default AutoComplete;
