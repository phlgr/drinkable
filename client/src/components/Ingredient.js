import React from 'react';
import styled from '@emotion/styled';

const IngredientSelector = styled.button`
  font-family: Comfortaa;
  color: ${(props) => props.theme.secondaryActive};
  padding: 4px 10px;
  font-size: 1.2rem;
  border: 3px solid ${(props) => props.theme.secondary};
  border-radius: 10px;
  background: none;
  outline: none;
  margin: 2px;
  ${(props) =>
    props.selected
      ? `
  transition: 2s;
  color: #fff;
  border: 3px solid ${props.theme.secondaryActive};
  background: ${props.theme.secondaryActive}
  `
      : ''}
`;

export default function Ingredient(props) {
  return (
    <>
      <IngredientSelector {...props}></IngredientSelector>
    </>
  );
}
