import React from 'react';
import styled from '@emotion/styled';
import Logo from '../assets/drinkable-logo.svg';
import { useHistory } from 'react-router-dom';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  cursor: pointer;
`;

const Heading = styled.h1`
  margin: 0 0 0 5px;
  color: ${(props) => props.theme.primary};
`;

export default function Header() {
  const history = useHistory();
  return (
    <HeaderContainer onClick={() => history.push('/')}>
      <img src={Logo} alt="Logo"></img>
      <Heading>drinkable.</Heading>
    </HeaderContainer>
  );
}
