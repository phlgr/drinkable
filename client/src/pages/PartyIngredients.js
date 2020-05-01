import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

import useGetParty from '../hooks/useGetParty';

import AddIcon from '../assets/add-icon.svg';
import PartyContainer from '../components/PartyContainer';
import Loading from '../components/Loading';
import ListItem from '../components/ListItem';
import Modal from '../components/Modal';

const AddButton = styled.img`
  padding: 20px;
  transform: scale(1.5);
`;

export default function PartyIngredients() {
  const history = useHistory();
  const { id } = useParams();
  const [{ party, error, loading }, doGetParty] = useGetParty(id);
  const [modal, setModal] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState('');

  const onIngredientEditButtonClick = (ingredient) => {
    setCurrentIngredient(ingredient);
    toggleModal();
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmitModal = () => {};

  return (
    <>
      {error && <p>No Party found :(</p>}
      {loading && <Loading />}
      {!loading && party && (
        <>
          {modal && (
            <Modal
              selected={true}
              toggleModal={toggleModal}
              onSubmit={handleSubmitModal}
              ingredient={currentIngredient}
              onIngredientChange={doGetParty}
            />
          )}
          <PartyContainer
            button={{
              label: 'Save ingredients',
              onClick: () => history.push(`/party/${id}`),
            }}
            party={party}
            onPartyNameChange={doGetParty}
          >
            {Object.entries(party.ingredients).map(([key, value]) => (
              <ListItem
                key={key}
                ingredient={key}
                amount={value.quantity}
                onEditButtonClick={onIngredientEditButtonClick}
              />
            ))}
            <AddButton
              alt="Add Button"
              src={AddIcon}
              onClick={() => history.push(`/party/${id}/ingredients`)}
            />
          </PartyContainer>
        </>
      )}
    </>
  );
}