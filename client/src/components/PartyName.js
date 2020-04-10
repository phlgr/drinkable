import React from 'react';
import styled from '@emotion/styled';

import Edit from '../assets/pencil-icon.svg';

const PartyNameContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.secondaryActive};
`;
const Name = styled.h2`
  font-size: 2.3rem;
  font-weight: 600;
  margin: 20px 0;
`;
const EditButton = styled.img`
  padding: 10px;
`;

export default function PartyName() {
  return (
    <>
      <PartyNameContainer>
        <Name>Your Party</Name>
        <EditButton src={Edit} alt="Edit Icon" />
      </PartyNameContainer>
    </>
  );
}
