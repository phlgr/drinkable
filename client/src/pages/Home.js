import React from 'react';
import styled from '@emotion/styled';

import { useHistory } from 'react-router-dom';
import usePostParty from '../hooks/usePostParty';

import Header from '../components/Header';
import Button from '../components/Button';
import backgroundImage from '../assets/home-background.png';
import Loading from '../components/Loading';

const BorderContainer = styled.div`
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
`;

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

const SecondaryContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  background: ${(props) => props.theme.secondaryActive};
  color: white;
  padding: 40px 20px 60px;
  flex-grow: 1;
  align-items: center;
  h2 {
    margin: 0;
  }
  li {
    padding: 5px 0;
  }
  ol {
    margin-bottom: 30px;
  }
  Button {
    align-self: flex-end;
  }
`;

const InstructionContainer = styled.div``;

const Footer = styled.footer`
  background: ${(props) => props.theme.background};
  width: 100%;
  text-align: center;
  padding: 3px 0;
  font-size: 0.8rem;
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
    <BorderContainer>
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
      <SecondaryContainer>
        <InstructionContainer>
          <h2>How to use:</h2>
          <ol>
            <li>Add Ingredients to your party</li>
            <li>Name your Party</li>
            <li>Share your Party with friends</li>
            <li>Have Fun!</li>
          </ol>
        </InstructionContainer>
        <Button background="secondary" onClick={partyButtonHandleCLick}>
          {!loading && !error && 'Start Planning!'}
          {loading && <Loading white />}
          {error && 'Try again!'}
        </Button>
      </SecondaryContainer>
      <Footer>Every Button leads towards the party!</Footer>
    </BorderContainer>
  );
}
