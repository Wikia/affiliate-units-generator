import React from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
  display: inline-block;
  font-weight: normal;
  opacity: .3;
  transition-duration: .3s;

  &:hover {
    opacity: 1;
  }
`;

type Props = {
  text: string;
};

function Label({ text }: Props) {
  return (
    <StyledSpan>{text}:&nbsp;</StyledSpan>
  );
}

export default Label;
