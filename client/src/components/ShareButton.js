import React from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

const Button = styled.div`
  display: inline-block;
  background: ${(props) => props.theme.secondaryActive};
  margin: 10px 0;
  margin-left: auto;
  padding: 10px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

export default function ShareButton() {
  const { id } = useParams();
  const [pasteURL, setPasteURL] = React.useState('');
  const [notification, setNotification] = React.useState(false);

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
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: pasteURL,
      });
    } else {
      copyToClipboard(pasteURL);
      setNotification(true);
      setTimeout(() => setNotification(false), 2000);
    }
  }

  return (
    <>
      <Button onClick={handleClick}>
        {!notification && 'Share'}
        {notification && 'Link copied!'}
      </Button>
    </>
  );
}
