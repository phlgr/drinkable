import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ThumbnailContainer = styled.div`
  display: flex;
  flex-basis: 40%;
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
  width: 40%;
  height: 80px;
  font-size: 1.5rem;
`;

export default function Thumbnail({ src, name }) {
  return <ThumbnailContainer src={src}>{name}</ThumbnailContainer>;
}

Thumbnail.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
};
