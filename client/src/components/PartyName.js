import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Edit from '../assets/pencil-icon.svg';
import Save from '../assets/checkmark.svg';

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
  cursor: pointer;
`;
const PartyNameInput = styled.input`
  color: ${(props) => props.theme.secondaryActive};
  max-width: 60%;
  background: none;
  font-family: Comfortaa;
  font-size: 2.3rem;
  font-weight: 600;
  margin: 20px 0;
  border: none;
  border-bottom: 3px solid ${(props) => props.theme.secondaryActive};
`;

export default function PartyName({ partyName }) {
  const [edit, setEdit] = React.useState(false);

  function handleEditClick() {
    setEdit(true);
  }

  function handleSaveClick() {}
  return (
    <>
      <PartyNameContainer>
        {!edit && (
          <>
            <Name>{partyName}</Name>
            <EditButton onClick={handleEditClick} src={Edit} alt="Edit Icon" />
          </>
        )}
        {edit && (
          <>
            <PartyNameInput placeholder={partyName} />
            <EditButton onClick={handleSaveClick} src={Save} />
          </>
        )}
      </PartyNameContainer>
    </>
  );
}

PartyName.propTypes = {
  partyName: PropTypes.string,
};
