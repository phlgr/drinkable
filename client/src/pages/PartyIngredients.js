import React from 'react';
import { useParams } from 'react-router-dom';

import useGetParty from '../hooks/useGetParty';

import PartyContainer from '../components/PartyContainer';
import Loading from '../components/Loading';
import ListItem from '../components/ListItem';

export default function PartyIngredients() {
  const { id } = useParams();
  const [{ party, error, loading }, doGetParty] = useGetParty(id);
  return (
    <>
      {error && <p>No Party found :(</p>}
      {loading && <Loading />}
      {!loading && party && (
        <PartyContainer
          button={{
            label: 'Save ingredients',
            onClick: () => console.log('Clicked me!'),
          }}
          party={party}
          onPartyNameChange={doGetParty}
        >
          {Object.entries(party.ingredients).map(([key, value]) => (
            <ListItem key={key} ingredient={key} amount={value.quantity} />
          ))}
        </PartyContainer>
      )}
    </>
  );
}
