import React from 'react';
import styled from '@emotion/styled';

import { useHistory } from 'react-router-dom';
import usePostParty from '../hooks/usePostParty';

import Header from '../components/Header';
import Button from '../components/Button';
import backgroundImage from '../assets/home-background.png';
import Loading from '../components/Loading';

const PrimaryContainer = styled.div`
  background-image: url("${backgroundImage}");
  background-size: cover;
  color: #fff;
  padding: 20px 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items:flex-end;
  max-height: 300px;
`;
const InfoText = styled.div`
  line-height: 26px;
  font-weight: 300;
  font-size: 1.4rem;
  padding-right: 20px;
  flex-basis: 100%;
  margin: 20px 0 60px;
`;

export default function Home() {
  const [{ partyId, error, loading }, doPost] = usePostParty();
  const history = useHistory();

  React.useEffect(() => {
    if (partyId) {
      history.push(`/party/${partyId}/ingredients`);
    }
  }, [partyId]);

  function partyButtonHandleCLick() {
    doPost();
  }
  return (
    <>
      <PrimaryContainer>
        <Header />
        <InfoText>
          Organise the drinks of your next Party with drinkable!
        </InfoText>
        <Button background="primary" onClick={partyButtonHandleCLick}>
          {!loading && !error && 'Plan a Party!'}
          {loading && <Loading white />}
          {error && 'Try again!'}
        </Button>
      </PrimaryContainer>
    </>
  );
}
