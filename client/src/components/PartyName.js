import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import usePatchParty from '../hooks/usePatchParty';
import Loading from '../components/Loading';

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

export default function PartyName(props) {
  const [edit, setEdit] = React.useState(false);
  const [partyName, setPartyName] = React.useState(props.partyName);
  const [partyNameInput, setPartyNameInput] = React.useState('');
  const { id } = useParams();
  const [{ error, loading }, doPatch] = usePatchParty(id, {
    name: partyName,
  });

  function handleEditClick() {
    setEdit(true);
  }

  React.useEffect(() => {
    if (partyName) {
      doPatch();
    }
  }, [partyName]);

  function handleSaveClick() {
    setPartyName(partyNameInput);
    setPartyNameInput('');
    setEdit(false);
  }
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
            <PartyNameInput
              value={partyNameInput}
              onChange={(event) => setPartyNameInput(event.target.value)}
              placeholder={partyName}
            />
            {!loading && <EditButton onClick={handleSaveClick} src={Save} />}
            {loading && <Loading />}
            {error && 'Error'}
          </>
        )}
      </PartyNameContainer>
    </>
  );
}

PartyName.propTypes = {
  partyName: PropTypes.string,
};
