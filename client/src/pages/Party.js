import React from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import PartyContainer from '../components/PartyContainer';
import useGetParty from '../hooks/useGetParty';
import Loading from '../components/Loading';
import Thumbnail from '../components/Thumbnail';
import SearchInput from '../components/SearchInput';

const ThumbnailContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

export default function Party() {
  const { id } = useParams();
  const [searchValue, setSearchValue] = React.useState('');
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
          <SearchInput
            placeholder={'Search drinks'}
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <ThumbnailContainer>
            {Object.entries(party.drinks).map(([key, value]) => (
              <Thumbnail key={value.id} src={value.thumbnail} name={key} />
            ))}
          </ThumbnailContainer>
        </PartyContainer>
      )}
    </>
  );
}
