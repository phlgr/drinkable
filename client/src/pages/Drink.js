import React from 'react';
import styled from '@emotion/styled';
import { useParams, useHistory } from 'react-router-dom';

import useGetDrinkDetails from '../hooks/useGetDrinkDetails';

import FullWrapper from '../components/FullWrapper';
import Header from '../components/Header';
import Arrow from '../assets/return-arrow.svg';
import Loading from '../components/Loading';

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
  font-size: 1.6rem;
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
  padding: 5px;
  flex-basis: 100%;
  text-align: justify;
`;

const InstructionHeader = styled.h2`
  margin: 10px 0 0 0;
`;

export default function Drink() {
  const history = useHistory();
  const { id } = useParams();
  const [{ drinkDetails, error, loading }] = useGetDrinkDetails(id);
  return (
    <>
      <FullWrapper>
        <Header />
        {loading && <Loading fullscreen />}
        {error && <p>There was an error loading this drink! Try reloading!</p>}

        {drinkDetails && (
          <>
            <HeaderContainer>
              <BackButton src={Arrow} onClick={history.goBack} />
              <DrinkName>{drinkDetails.name}</DrinkName>
            </HeaderContainer>
            <ContentContainer>
              <CocktailThumbnail src={drinkDetails.image} />
              <IngredientsContainer>
                <IngredientsHeader>Ingredients:</IngredientsHeader>
                {drinkDetails.ingredients.map((ingredient, i) => (
                  <Ingredient key={i}>
                    {ingredient.name} {ingredient.amount}
                  </Ingredient>
                ))}
              </IngredientsContainer>
            </ContentContainer>
            <InstructionContainer>
              <InstructionHeader>Instructions:</InstructionHeader>
              <p>{drinkDetails.instructions}</p>
            </InstructionContainer>
          </>
        )}
      </FullWrapper>
    </>
  );
}
