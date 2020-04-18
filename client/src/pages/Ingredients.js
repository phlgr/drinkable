import React from 'react';

import PartyContainer from '../components/PartyContainer';
import SearchInput from '../components/SearchInput';
import Loading from '../components/Loading';

import useGetIngredients from '../hooks/useGetIngredients';

export default function Ingredients() {
  const [searchValue, setSearchValue] = React.useState('');
  const [{ ingredients, error, loading }] = useGetIngredients();

  function handleChange(value) {
    setSearchValue(value);
  }
  return (
    <>
      <PartyContainer>
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
