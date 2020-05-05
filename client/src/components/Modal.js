import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import closeSVG from '../assets/md-close-circle.svg';
import minusSVG from '../assets/minus-circle.svg';
import plusSVG from '../assets/plus-circle.svg';

import Button from '../components/Button';
import usePatchParty from '../hooks/usePatchParty';
import Loading from './Loading';
import useDeletePartyIngredient from '../hooks/useDeletePartyIngredient';

const Blur = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.secondaryActive};
  opacity: 0.8;
  backdrop-filter: blur(10px);
  z-index: 1;
`;

const IngredientHeader = styled.h2`
  color: ${(props) => props.theme.secondaryActive};
  font-weight: 400;
  font-size: 2.4rem;
  margin: 0;
  text-transform: capitalize;
`;

const ModalContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalArea = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 90%;
  background: ${(props) => props.theme.background};
  border-radius: 20px;
  z-index: 999;
  padding: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-basis: 100%;
  justify-content: space-between;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-basis: 100%;
  margin: 20px 0 0 0;
`;

const ModalInput = styled.input`
  background: none;
  border: none;
  border-bottom: 3px solid ${(props) => props.theme.secondary};
  margin: 0 15px;
  width: 30%;
  outline: none;
  font-family: Comfortaa;
  font-weight: 700;
  font-size: 3rem;
  text-align: center;
  color: ${(props) => props.theme.secondary};
`;

const ModalAmounts = styled.div`
  display: flex;
  flex-basis: 100%;
  justify-content: center;
  margin: 5px 0 10px 0;
  > * {
    transform: scale(0.8);
  }
`;

const ModalFooter = styled.div`
  display: flex;
  flex-basis: 100%;
  justify-content: space-between;
  > * {
    margin: 5px 5px;
  }
`;

const SVG = styled.img`
  cursor: pointer;
`;

export default function Modal({
  ingredient,
  toggleModal,
  onIngredientChange,
  selected,
}) {
  const { id } = useParams();
  const [content, setContent] = React.useState();
  const [amount, setAmount] = React.useState('3l');
  const [deleteIngredient, setDeleteIngredient] = React.useState(false);
  const [patchIngredient, setPatchIngredient] = React.useState(false);
  const [{ loading: deleteLoading }, doDelete] = useDeletePartyIngredient(
    id,
    content
  );
  const [{ loading }, doPatch] = usePatchParty(id, content);

  React.useEffect(() => {
    if (content) {
      doDelete().then(toggleModal).then(onIngredientChange);
    }
  }, [deleteIngredient]);

  React.useEffect(() => {
    if (content) {
      doPatch().then(toggleModal).then(onIngredientChange);
    }
  }, [patchIngredient]);

  function extractNumber(value) {
    return parseFloat(value);
  }
  function addUp() {
    const newAmount = `${extractNumber(amount) + 1}l`.toString();
    setAmount(newAmount);
  }
  function subtract() {
    if (extractNumber(amount) <= 1) {
      setAmount('0l');
      return;
    }
    const newAmount = `${extractNumber(amount) - 1}l`.toString();
    setAmount(newAmount);
  }
  function handleInput(input) {
    setAmount(input);
  }

  function handleAmountButtonClick(amount) {
    setAmount(amount);
  }

  function closeModal() {
    toggleModal();
  }

  function handleAddButtonClick() {
    setContent({
      [`ingredients.${ingredient}`]: { quantity: amount },
    });
    setPatchIngredient(true);
  }

  function handleRemoveButtonClick() {
    setContent({
      [`ingredients.${ingredient}`]: { quantity: amount },
    });
    setDeleteIngredient(true);
  }

  return (
    <>
      <Blur />
      <ModalContainer>
        <ModalArea>
          <ModalHeader>
            <IngredientHeader>{ingredient}</IngredientHeader>
            <SVG src={closeSVG} onClick={closeModal} />
          </ModalHeader>
          <ModalContent>
            <SVG src={minusSVG} onClick={subtract} />
            <ModalInput
              value={amount}
              onChange={(event) => handleInput(event.target.value)}
            ></ModalInput>
            <SVG src={plusSVG} onClick={addUp} />
          </ModalContent>
          <ModalAmounts>
            <Button
              background={'secondaryActive'}
              onClick={(event) =>
                handleAmountButtonClick(event.target.innerText)
              }
            >
              0.7l
            </Button>
            <Button
              background={'secondaryActive'}
              onClick={(event) =>
                handleAmountButtonClick(event.target.innerText)
              }
            >
              1.5l
            </Button>
          </ModalAmounts>
          <ModalFooter>
            {selected && (
              <>
                <Button
                  onClick={handleRemoveButtonClick}
                  full
                  background={'primary'}
                >
                  {!deleteLoading && 'Delete'}
                  {deleteLoading && <Loading white />}
                </Button>
                <Button
                  onClick={handleAddButtonClick}
                  full
                  background={'secondary'}
                >
                  {!loading && 'Update'}
                  {loading && <Loading white />}
                </Button>
              </>
            )}
            {!selected && (
              <>
                <Button
                  onClick={handleAddButtonClick}
                  full
                  background={'secondary'}
                >
                  {!loading && 'Add'}
                  {loading && <Loading white />}
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalArea>
      </ModalContainer>
    </>
  );
}

Modal.propTypes = {
  ingredient: PropTypes.string.isRequired,
  toggleModal: PropTypes.func,
  onIngredientChange: PropTypes.func,
  selected: PropTypes.bool,
};
