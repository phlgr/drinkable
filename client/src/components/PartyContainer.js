import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Header from './Header.js';
import PartyName from './PartyName';
import Button from './Button';

const BorderContainer = styled.div`
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  max-height: 100%;
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

export default function PartyContainer({
  button,
  party,
  onPartyNameChange,
  ...props
}) {
  return (
    <>
      <BorderContainer>
        <HeaderContainer>
          <Header />
          <PartyName name={party.name} onChange={onPartyNameChange} />
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
  party: PropTypes.object,
  onPartyNameChange: PropTypes.func,
};
