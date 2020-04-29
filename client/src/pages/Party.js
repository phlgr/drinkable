import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

import PartyContainer from '../components/PartyContainer';
import useGetParty from '../hooks/useGetParty';
import Loading from '../components/Loading';
import Thumbnail from '../components/Thumbnail';

const ThumbnailContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

export default function Party() {
  const history = useHistory();
  const { id } = useParams();
  const [{ party, error, loading }, doGetParty] = useGetParty(id);
  return (
    <>
      {error && <p>No Party found :(</p>}
      {loading && <Loading />}
      {!loading && party && (
        <PartyContainer
          button={{
            label: 'Manage Ingredients',
            onClick: () => console.log('Clicked me!'),
          }}
          party={party}
          onPartyNameChange={doGetParty}
        >
          <ThumbnailContainer>
            {Object.entries(party.drinks).map(([key, value]) => (
              <Thumbnail
                key={value.id}
                src={value.thumbnail}
                name={key}
                onClick={() => history.push(`/drink/${value.id}`)}
              />
            ))}
          </ThumbnailContainer>
        </PartyContainer>
      )}
    </>
  );
}
