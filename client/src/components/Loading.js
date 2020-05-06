import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const LoadingAnimation = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${(props) => (props.white ? '#fff' : props.theme.primary)};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-of-type(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  div:nth-of-type(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-of-type(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-of-type(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
  ${(props) =>
    props.fullscreen
      ? `z-index: 2;
  `
      : ''}
`;

const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.fullscreen
      ? `position: absolute;
      top:0;
      right:0;
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;`
      : ''}
`;

const Blur = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.background};
  opacity: 0.8;
  backdrop-filter: blur(10px);
  z-index: 1;
`;

export default function Loading(props) {
  return (
    <LoadingWrapper {...props}>
      {props.fullscreen && <Blur />}
      <LoadingAnimation {...props}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoadingAnimation>
    </LoadingWrapper>
  );
}

Loading.propTypes = {
  fullscreen: PropTypes.any,
};
