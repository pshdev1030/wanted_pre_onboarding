import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { tagsType } from "../types/tags";

interface TagComponentType {
  addTag: (e: React.ChangeEvent<HTMLFormElement>) => void;
  removeTag: (id: number) => void;
  tags: tagsType[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tagValue: string;
}

const Tag = ({
  addTag,
  removeTag,
  tags,
  onChange,
  tagValue,
}: TagComponentType) => {
  return (
    <TagContentWrapper>
      {tags.map((tag) => (
        <TagWrapper key={tag.id}>
          {tag.val}
          <button onClick={() => removeTag(tag.id)}>×</button>
        </TagWrapper>
      ))}
      <form onSubmit={addTag}>
        <TagInput
          value={tagValue}
          onChange={onChange}
          placeholder="Press enter to add tags"
        ></TagInput>
      </form>
    </TagContentWrapper>
  );
};

export default Tag;

const TagContentWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const TagWrapper = styled.div`
  background-color: #8b00ff;
  border-radius: 10px;
  padding: 5px;
  margin-right: 10px;
  & > button {
    all: unset;
    cursor: pointer;
    padding: 3px;
    margin-left: 5px;
    border-radius: 10px;
    background: #f3f3f3;
  }
`;

const TagInput = styled.input`
  all: unset;
  display: inline-block;
  padding: 10px;
`;
