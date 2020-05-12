import { useCallback, useState } from 'react';
import { patchParty } from '../api/parties';

export default function usePatchParty(partyId, content) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const doPatch = useCallback(
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
    },
    [content, partyId]
  );

  return [{ response, error, loading }, doPatch];
}
