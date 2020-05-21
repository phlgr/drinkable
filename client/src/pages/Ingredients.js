import React, { useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import PartyContainer from '../components/PartyContainer';
import SearchInput from '../components/SearchInput';
import Loading from '../components/Loading';
import Ingredient from '../components/Ingredient';

import FullWrapper from '../components/FullWrapper';
import useGetIngredients from '../hooks/useGetIngredients';
import useGetParty from '../hooks/useGetParty';
import Modal from '../components/Modal';
import Header from '../components/Header';
import ErrorMessage from '../components/ErrorMessage';

export default function Ingredients() {
  const history = useHistory();
  const { id } = useParams();
  const [searchValue, setSearchValue] = React.useState('');
  const [{ ingredients, error, loading }] = useGetIngredients(searchValue);
  const [modal, setModal] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState('');
  const [
    currentIngredientSelected,
    setCurrentIngredientSelected,
  ] = React.useState(false);
  const [
    { party, error: partyError, loading: partyLoading },
    doGetParty,
  ] = useGetParty(id);

  const handleIngredientSelect = (name, selected) => {
    setCurrentIngredient(name);
    setCurrentIngredientSelected(selected);
    setModal(true);
  };

  const toggleModal = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const handleSubmitModal = () => {};

  function handleButtonClick() {
    history.push(`/party/${id}`);
  }

  function handleChange(value) {
    setSearchValue(value);
  }

  const partyIngredientNames = party ? Object.keys(party.ingredients) : [];

  return (
    <>
      {partyLoading && <Loading fullscreen />}
      {partyError && (
        <FullWrapper>
          <Header />
          <ErrorMessage
            message={'Could not find a party'}
            btntext={'Return to Home'}
            link={'/'}
          />
        </FullWrapper>
      )}
      {party && (
        <>
          {modal && (
            <Modal
              selected={currentIngredientSelected}
              toggleModal={toggleModal}
              onSubmit={handleSubmitModal}
              ingredient={currentIngredient}
              onIngredientChange={doGetParty}
            />
          )}

          <PartyContainer
            button={{
              label: 'Continue',
              onClick: handleButtonClick,
            }}
            party={party}
            onPartyNameChange={doGetParty}
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
                  selected={partyIngredientNames.includes(ingredient.name)}
                  onSelect={() =>
                    handleIngredientSelect(
                      ingredient.name,
                      partyIngredientNames.includes(ingredient.name)
                    )
                  }
                  key={ingredient.name}
                >
                  {ingredient.name}
                </Ingredient>
              ))}
          </PartyContainer>
        </>
      )}
    </>
  );
}
