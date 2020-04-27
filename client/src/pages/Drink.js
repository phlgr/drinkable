import React from 'react';
import styled from '@emotion/styled';

import Header from '../components/Header';

import Arrow from '../assets/return-arrow.svg';

const FullWrapper = styled.div`
  position: fixed;
  padding: 20px;
  height: 100%;
  width: 100vw;
  color: ${(props) => props.theme.secondaryActive};
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const BackButton = styled.img`
  cursor: pointer;
  margin: 0 10px 0 0;
`;

const DrinkName = styled.h2`
  font-size: 1.8rem;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
`;

const CocktailThumbnail = styled.img`
  width: 50%;
  height: 50%;
  border-radius: 10px;
  padding: 5px;
`;
const IngredientsContainer = styled.div`
  flex-grow: 1;
  padding: 5px;
`;

const IngredientsHeader = styled.h3`
  margin: 0;
`;

const Ingredient = styled.p`
  margin: 2px;
`;

const InstructionContainer = styled.div`
  flex-basis: 100%;
`;

const InstructionHeader = styled.h2`
  margin: 10px 0 0 0;
`;

export default function Drink() {
  return (
    <FullWrapper>
      <Header />
      <HeaderContainer>
        <BackButton src={Arrow} />
        <DrinkName>Mojito</DrinkName>
      </HeaderContainer>
      <ContentContainer>
        <CocktailThumbnail
          src={
            'https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg'
          }
        />
        <IngredientsContainer>
          <IngredientsHeader>Ingredients:</IngredientsHeader>
          <Ingredient>Cola</Ingredient>
          <Ingredient>Cola</Ingredient>
          <Ingredient>Cola</Ingredient>
          <Ingredient>Cola</Ingredient>
        </IngredientsContainer>
      </ContentContainer>
      <InstructionContainer>
        <InstructionHeader>Instructions:</InstructionHeader>
        <p>
          Muddle mint leaves with sugar and lime juice. Add a splash of soda
          water and fill the glass with cracked ice. Pour the rum and top with
          soda water. Garnish and serve with straw.
        </p>
      </InstructionContainer>
    </FullWrapper>
  );
}
