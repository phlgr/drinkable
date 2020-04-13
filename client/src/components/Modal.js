import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Blur = styled.div`
  ${(props) =>
    props.active
      ? `
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        height: 100vh;
        width: 100vw;
        filter: blur(4px);
        background: ${props.theme.secondaryActive};
        opacity: 0.8;
        `
      : ''}
`;

const IngredientHeader = styled.h2`
  color: ${(props) => props.theme.secondaryActive};
  font-weight: 400;
  font-size: 3rem;
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
      <Blur active={props.active} {...props}></Blur>
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
