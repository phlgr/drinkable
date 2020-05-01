import React from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

const Button = styled.div`
  background: ${(props) => props.theme.secondaryActive};
  padding: 10px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

export default function ShareButton() {
  const { id } = useParams();
  const [pasteURL, setPasteURL] = React.useState('');

  React.useEffect(() => {
    setPasteURL(`${window.location.origin}/party/${id}`);
  }, [id]);

  function copyToClipboard(value) {
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = value;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }

  async function handleClick() {
    copyToClipboard(pasteURL);
  }

  return <Button onClick={handleClick}>Share</Button>;
}
