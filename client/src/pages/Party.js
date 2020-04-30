import React from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import useGetParty from '../hooks/useGetParty';
import useGetPartyDrinks from '../hooks/useGetPartyDrinks';

import PartyContainer from '../components/PartyContainer';
import Loading from '../components/Loading';
import Thumbnail from '../components/Thumbnail';
import SearchInput from '../components/SearchInput';

const ThumbnailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

export default function Party() {
  const { id } = useParams();
  const [searchValue, setSearchValue] = React.useState('');
  const [{ party, error, loading }, doGetParty] = useGetParty(id);
  const [
    { drinks, error: errorDrinks, loading: loadingDrinks },
  ] = useGetPartyDrinks(id, searchValue);
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
          {errorDrinks && <p>Could not load drinks :(</p>}
          {loadingDrinks && <Loading />}
          {drinks && !loadingDrinks && (
            <ThumbnailContainer>
              {Object.entries(drinks).map(([key, value]) => (
                <Thumbnail key={value.id} src={value.thumbnail} name={key} />
              ))}
            </ThumbnailContainer>
          )}
        </PartyContainer>
      )}
    </>
  );
}
