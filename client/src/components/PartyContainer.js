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

const HeaderContainer = styled.div`
  height: auto;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: auto;
`;

const FooterContainer = styled.div``;

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
