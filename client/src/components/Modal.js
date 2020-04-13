import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Blur = styled.div`
  ${(props) =>
    props.active
      ? `
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 100%;
        filter: alpha(opacity = 50);
        background: ${props.theme.secondaryActive};
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
  width: 90%;
  background: ${(props) => props.theme.background};
  border-radius: 20px;
  z-index: 999;
  padding: 20px;
`;

export default function Modal(props) {
  return (
    <>
      aohjsdöjwööoadfböoj
      <Blur active={props.active}></Blur>
      <ModalContainer>
        <ModalArea>
          <IngredientHeader>{props.ingredient}</IngredientHeader>
        </ModalArea>
      </ModalContainer>
    </>
  );
}

Modal.propTypes = {
  active: PropTypes.bool,
  ingredient: PropTypes.string.isRequired,
};
