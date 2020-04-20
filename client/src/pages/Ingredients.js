import React from 'react';

import PartyContainer from '../components/PartyContainer';
import SearchInput from '../components/SearchInput';
import Loading from '../components/Loading';

import useGetIngredients from '../hooks/useGetIngredients';

export default function Ingredients() {
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);

  const handleSelect = (name) => {
    console.log(selectedIngredients);
    const newIngredients = selectedIngredients;
    if (selectedIngredients.includes(name)) {
      const itemIndex = newIngredients.indexOf(name);
      newIngredients.splice(itemIndex, 1);
    } else {
      newIngredients.push(name);
    }
    setSelectedIngredients(newIngredients);
  };

  const [{ ingredients, error, loading }] = useGetIngredients(
    searchValue,
    handleSelect
  );

  function handleButtonClick() {
    console.log('You clicked me!');
  }

  function handleChange(value) {
    setSearchValue(value);
  }

  return (
    <>
      <PartyContainer
        button={{
          label: 'Continue',
          onClick: handleButtonClick,
        }}
      >
        <SearchInput
          value={searchValue}
          onChange={(event) => handleChange(event.target.value)}
          placeholder={'Search ingredients'}
        ></SearchInput>
        {loading && <Loading />}
        {error && <p>Error!</p>}
        {ingredients && ingredients}
      </PartyContainer>
    </>
  );
}
