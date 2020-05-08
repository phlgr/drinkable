import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import usePatchParty from '../hooks/usePatchParty';
import Loading from '../components/Loading';

import Edit from '../assets/pencil-icon.svg';
import Save from '../assets/checkmark.svg';

const PartyNameContainer = styled.div`
  max-width: 75%;
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

const EditContainer = styled.div`
  display: flex;
  max-width: 90%;
  @media (min-width: 1000px) {
    max-width: 100%;
  }
`;
const PartyNameInput = styled.input`
  max-width: 80%;
  color: ${(props) => props.theme.secondaryActive};
  background: none;
  font-family: Comfortaa;
  font-size: 2.3rem;
  font-weight: 600;
  margin: 20px 0;
  border: none;
  border-bottom: 3px solid ${(props) => props.theme.secondaryActive};
`;

export default function PartyName(props) {
  const { id } = useParams();
  const [edit, setEdit] = React.useState(false);
  const [partyName, setPartyName] = React.useState(props.name);
  const [{ error, loading }, doPatch] = usePatchParty(id, {
    name: partyName,
  });

  function handleEditClick() {
    setPartyName('');
    setEdit(true);
  }

  function handleSaveClick() {
    if (partyName) {
      doPatch();
      props.onChange();
    } else {
      setPartyName(props.name);
    }
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
          <EditContainer>
            <PartyNameInput
              value={partyName}
              onChange={(event) => setPartyName(event.target.value)}
              placeholder={props.name}
            />
            {!loading && <EditButton onClick={handleSaveClick} src={Save} />}
            {loading && <Loading />}
            {error && 'Error'}
          </EditContainer>
        )}
      </PartyNameContainer>
    </>
  );
}

PartyName.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
};
