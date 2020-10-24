import React from 'react';
import styled from '@emotion/styled';
import { mq } from '../themes/GlobalStyles';
import { useHistory } from 'react-router-dom';
import usePostParty from '../hooks/usePostParty';

import Header from '../components/Header';
import Button from '../components/Button';
import backgroundImage from '../assets/home-background.png';
import Loading from '../components/Loading';

const BorderContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  ${mq('lg')} {
    flex-flow: row;
  }
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

  ${mq('sm')} {
    max-height:100%;
    height:80vh;
    align-items:flex-start;
  }

  ${mq('lg')} {
    width:50%
  }
`;

const PrimaryContent = styled.div`
  flex-basis: 100%;
  text-align: center;
  margin: 0 50px;
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
  padding: 20px;
  flex-grow: 1;
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

  ${mq('sm')} {
    display: none;
  }
  ${mq('lg')} {
    display: flex;
    justify-content: center;
    align-items: center;
    Button {
      align-self: center;
    }
  }
`;

const InstructionContainer = styled.div``;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  background: ${(props) => props.theme.background};
  max-width: 100%;
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
  }, [partyId, history]);

  function partyButtonHandleCLick() {
    doPost();
  }
  return (
    <>
      {loading && <Loading fullscreen />}
      <BorderContainer>
        <PrimaryContainer>
          <Header />
          <PrimaryContent>
            <InfoText>
              Organise the drinks of your next Party with drinkable!
            </InfoText>
            <Button background="primary" onClick={partyButtonHandleCLick}>
              {!loading && !error && 'Plan a Party!'}

              {error && 'Try again!'}
            </Button>
          </PrimaryContent>
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
            {error && 'Try again!'}
          </Button>
        </SecondaryContainer>
        <Footer>Every Button leads towards the party!</Footer>
      </BorderContainer>
    </>
  );
}
