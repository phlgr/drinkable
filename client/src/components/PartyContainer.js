import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Header from './Header.js';
import PartyName from './PartyName';
import Button from './Button';

const BorderContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
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
  overflow: auto;
`;

const FooterContainer = styled.div``;

export default function PartyContainer({ button, ...props }) {
  return (
    <>
      <BorderContainer>
        <HeaderContainer>
          <Header />
          <PartyName />
        </HeaderContainer>
        <ContentContainer {...props}></ContentContainer>
        <FooterContainer>
          <Button onClick={button.onClick} full background="primary">
            {button.label}
          </Button>
        </FooterContainer>
      </BorderContainer>
    </>
  );
}

PartyContainer.propTypes = {
  button: PropTypes.object,
};
