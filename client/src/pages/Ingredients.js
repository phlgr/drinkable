import React from 'react';
import { useParams } from 'react-router-dom';

import PartyContainer from '../components/PartyContainer';
import SearchInput from '../components/SearchInput';
import Loading from '../components/Loading';
import Ingredient from '../components/Ingredient';

import useGetIngredients from '../hooks/useGetIngredients';
import useGetParty from '../hooks/useGetParty';

export default function Ingredients() {
  const { id } = useParams();
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);
  const [{ ingredients, error, loading }] = useGetIngredients(searchValue);
  const [{ party, getError, getLoading }] = useGetParty(id);

  const handleSelect = (name) => {
    const newIngredients = selectedIngredients;
    if (selectedIngredients.includes(name)) {
      const itemIndex = newIngredients.indexOf(name);
      newIngredients.splice(itemIndex, 1);
    } else {
      newIngredients.push(name);
    }
    setSelectedIngredients(newIngredients);
    console.log(selectedIngredients);
  };

  function handleButtonClick() {
    console.log('You clicked me!');
  }

  function handleChange(value) {
    setSearchValue(value);
  }

  return (
    <>
      {getError && 'Error!'}
      {getLoading && <Loading />}
      {party && (
        <PartyContainer
          button={{
            label: 'Continue',
            onClick: handleButtonClick,
          }}
          partyName={{ name: party.name }}
        >
          <SearchInput
            value={searchValue}
            onChange={(event) => handleChange(event.target.value)}
            placeholder={'Search ingredients'}
          ></SearchInput>
          {loading && <Loading />}
          {error && <p>Error!</p>}
          {ingredients &&
            ingredients.map((ingredient) => (
              <Ingredient
                onSelect={() => handleSelect(ingredient.name)}
                key={ingredient.name}
              >
                {ingredient.name}
              </Ingredient>
            ))}
        </PartyContainer>
      )}
    </>
  );
}
