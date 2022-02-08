import styled from "@emotion/styled";
import React, { ReactNode } from "react";

interface TemplateComponentType {
  children: ReactNode;
}

const Template = ({ children }: TemplateComponentType) => {
  return <TemplateWrapper>{children}</TemplateWrapper>;
};
export default Template;

const TemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 100px;
  height: 400px;
  & > h1 {
    text-align: left;
  }
`;
