import React, { useCallback, useState } from "react";
import { TagContentWrapper, TagInput, TagWrapper } from "../style/Tag";
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
