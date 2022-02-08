import React, { ReactNode } from "react";
import { TemplateWrapper } from "../style/Template";

interface TemplateComponentType {
  children: ReactNode;
}

const Template = ({ children }: TemplateComponentType) => {
  return <TemplateWrapper>{children}</TemplateWrapper>;
};
export default Template;
