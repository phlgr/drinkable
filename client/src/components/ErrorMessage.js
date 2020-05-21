import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Button from '../components/Button';

export default function ErrorMessage({ message, btntext, link }) {
  const history = useHistory();
  return (
    <>
      <p>{message}</p>
      <Button background={'primary'} onClick={() => history.push(link)}>
        {btntext}
      </Button>
    </>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  btntext: PropTypes.string,
  link: PropTypes.string,
};
