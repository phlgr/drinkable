import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import MagnifyingGlasses from '../assets/search.svg';

const SearchField = styled.input`
  font-family: Comfortaa;
  font-size: 1.5rem;
  color: ${(props) => props.theme.primary};
  font-weight: 300;
  background: none;
  border: none;
  border-bottom: 3px solid ${(props) => props.theme.primary};
  background: url(${MagnifyingGlasses}) no-repeat;
  background-position: 5px 30%;
  padding-left: 30px;

  width: 90%;
  outline: none;
  &::placeholder {
    color: ${(props) => props.theme.primary};
  }
`;

export default function SearchInput(props) {
  return (
    <>
      <SearchField placeholder={props.placeholder} />
    </>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
};
