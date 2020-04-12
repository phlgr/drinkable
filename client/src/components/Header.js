import React from 'react';
import styled from '@emotion/styled';
import Logo from '../assets/drinkable-logo.svg';

const HeaderContainer = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
`;

const Heading = styled.h1`
  margin: 0 0 0 5px;
  color: ${(props) => props.theme.primary};
`;

export default function Header() {
  return (
    <HeaderContainer>
      <img src={Logo} alt="Logo"></img>
      <Heading>drinkable.</Heading>
    </HeaderContainer>
  );
}
