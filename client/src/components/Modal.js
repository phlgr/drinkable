import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import closeSVG from '../assets/md-close-circle.svg';
import minusSVG from '../assets/minus-circle.svg';
import plusSVG from '../assets/plus-circle.svg';

import Button from '../components/Button';

const Blur = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.secondaryActive};
  opacity: 0.8;
  backdrop-filter: blur(10px);
`;

const IngredientHeader = styled.h2`
  color: ${(props) => props.theme.secondaryActive};
  font-weight: 400;
  font-size: 2.4rem;
  margin: 0;
`;

const ModalContainer = styled.div`
  visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
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

export default function Modal(props) {
  const [hidden, setHidden] = React.useState(false);
  const [amount, setAmount] = React.useState('3l');

  function extractNumber(value) {
    return parseFloat(value);
  }
  function addUp() {
    const newAmount = `${extractNumber(amount) + 1}l`.toString();
    console.log(newAmount);
    setAmount(newAmount);
  }
  function subtract() {
    if (extractNumber(amount) <= 0) {
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
    setHidden(true);
  }
  return (
    <>
      <Blur active={props.active} hidden={hidden}></Blur>
      <ModalContainer hidden={hidden}>
        <ModalArea>
          <ModalHeader>
            <IngredientHeader>{props.ingredient}</IngredientHeader>
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
            <Button full background={'primary'}>
              Remove
            </Button>
            <Button full background={'secondary'}>
              Add
            </Button>
          </ModalFooter>
        </ModalArea>
      </ModalContainer>
    </>
  );
}

Modal.propTypes = {
  active: PropTypes.bool,
  ingredient: PropTypes.string.isRequired,
};
