import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import editIcon from '../assets/pencil-icon.svg';

const Item = styled.div`
  display: flex;
  flex-direction: column nowrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid ${(props) => props.theme.primary};
  width: 90vw;
  color: ${(props) => props.theme.secondaryActive};
  padding: 5px 10px 5px 5px;
  > * {
    margin: 0;
  }
  > img {
    padding: 0 0 0 10px;
  }
`;

const Name = styled.h2`
  font-size: 1.8rem;
  flex-grow: 1;
`;

const Amount = styled.h2`
  font-size: 1.8rem;
  color: ${(props) => props.theme.primary};
  font-weight: 300;
`;

const EditIcon = styled.img`
  padding-bottom: 5px;
  cursor: pointer;
`;

export default function ListItem({ ingredient, amount }) {
  return (
    <Item>
      <Name>{ingredient}</Name>

      <Amount>{amount}l</Amount>
      <EditIcon src={editIcon}></EditIcon>
    </Item>
  );
}

ListItem.propTypes = {
  ingredient: PropTypes.string,
  amount: PropTypes.number,
};
