import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Header from './Header.js';
import PartyName from './PartyName';
import Button from './Button';
import ShareButton from './ShareButton.js';

const BorderContainer = styled.div`
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const HeaderContainer = styled.div`
  height: auto;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
          <HeaderRow>
            <PartyName name={party.name} onChange={onPartyNameChange} />
            <ShareButton />
          </HeaderRow>
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
