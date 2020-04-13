import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import closeSVG from '../assets/md-close-circle.svg';
import minusSVG from '../assets/minus-circle.svg';
import plusSVG from '../assets/plus-circle.svg';

import Button from '../components/Button';

const Blur = styled.div`
  ${(props) =>
    props.active
      ? `
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
        background: ${props.theme.secondaryActive};
        opacity: 0.8;
        backdrop-filter: blur(10px);
        `
      : ''}
`;

const IngredientHeader = styled.h2`
  color: ${(props) => props.theme.secondaryActive};
  font-weight: 400;
  font-size: 2.4rem;
  margin: 0;
`;

const ModalContainer = styled.div`
  width: 100vw;
  height: 80vh;
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
  margin: 20px 0;
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

const ModalFooter = styled.div`
  display: flex;
  flex-basis: 100%;
  justify-content: space-between;
  > * {
    margin: 5px 5px;
  }
`;

const SVG = styled.img``;

export default function Modal(props) {
  function addUp() {}
  function subtract() {}
  function closeModal() {}
  return (
    <>
      aohjsdöjwööoadfböoj
      <Blur active={props.active}></Blur>
      <ModalContainer>
        <ModalArea>
          <ModalHeader>
            <IngredientHeader>{props.ingredient}</IngredientHeader>
            <SVG src={closeSVG} onClick={closeModal} />
          </ModalHeader>
          <ModalContent>
            <SVG src={minusSVG} onClick={subtract} />
            <ModalInput></ModalInput>
            <SVG src={plusSVG} onClick={addUp} />
          </ModalContent>
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
