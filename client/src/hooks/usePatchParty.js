import React from 'react';
import { patchParty } from '../api/party';

export default function usePatchParty(partyId, content) {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function doPatch() {
    try {
      setLoading(true);
      const response = await patchParty(partyId, content);
      setResponse(response);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    doPatch();
  }, [content]);

  return [{ response, error, loading }];
}
