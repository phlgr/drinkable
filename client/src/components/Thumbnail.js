import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ThumbnailContainer = styled.div`
  display: flex;
  width: calc(50% - 10px);
  text-align: center;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
      to bottom,
      rgba(256, 256, 256, 0.5) 0%,
      rgba(256, 256, 256, 0.5) 100%
    ),
    url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 20px;
  height: 80px;
  font-size: 5vw;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
`;

export default function Thumbnail({ src, name }) {
  return <ThumbnailContainer src={`${src}`}>{name}</ThumbnailContainer>;
}

Thumbnail.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
};
