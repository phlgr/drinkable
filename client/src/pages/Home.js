import React from 'react';
import styled from '@emotion/styled';

import Header from '../components/Header';
import Button from '../components/Button';
import backgroundImage from '../assets/home-background.png';

const PrimaryContainer = styled.div`
  background-image: url("${backgroundImage}");
  color: #fff;
  padding: 0px 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content:flex-end;
  height:300px;
  
`;
const InfoText = styled.div`
  line-height: 26px;
  font-weight: 300;
  font-size: 1.4rem;
  padding-right: 20px;
  flex-basis: 100%;
`;

export default function Home() {
  return (
    <>
      <PrimaryContainer>
        <Header />
        <InfoText>
          Organise the drinks of your next Party with drinkable!
        </InfoText>
        <Button background="primary">Plan a Party!</Button>
      </PrimaryContainer>
    </>
  );
}
