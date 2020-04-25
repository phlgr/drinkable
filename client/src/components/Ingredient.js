import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const IngredientSelector = styled.button`
  transition: 200ms;
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
  transition: 200ms;
  color: #fff;
  border: 3px solid ${props.theme.secondaryActive};
  background: ${props.theme.secondaryActive}
  `
      : ''}
`;

export default function Ingredient(props) {
  return (
    <>
      <IngredientSelector
        onClick={(event) => props.onSelect(event.target.innerText)}
        selected={props.selected}
        {...props}
      ></IngredientSelector>
    </>
  );
}

Ingredient.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
};
