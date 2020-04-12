import React from 'react';
import styled from '@emotion/styled';

import Header from './Header.js';
import PartyName from './PartyName';
import Button from './Button';

const BorderContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 100vw;
  height: 100vh;
  padding: 20px;
`;

const HeaderContainer = styled.div``;

const ContentContainer = styled.div`
  flex-grow: 1;
`;

const FooterContainer = styled.div`
  justify-content: flex-end;
`;

export default function PartyContainer(props) {
  return (
    <>
      <BorderContainer>
        <HeaderContainer>
          <Header />
          <PartyName />
        </HeaderContainer>
        <ContentContainer {...props}></ContentContainer>
        <FooterContainer>
          <Button full background="primary">
            Continue
          </Button>
        </FooterContainer>
      </BorderContainer>
    </>
  );
}
