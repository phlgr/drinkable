import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

import Button from '../components/Button';

const ErrorWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  padding: 20px;
  justify-content: center;
  p {
    text-align: center;
  }
`;

export default function ErrorMessage({ message, btntext, link }) {
  const history = useHistory();
  return (
    <ErrorWrapper>
      <p>{message}</p>
      <Button background={'primary'} onClick={() => history.push(link)}>
        {btntext}
      </Button>
    </ErrorWrapper>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  btntext: PropTypes.string,
  link: PropTypes.string,
};
