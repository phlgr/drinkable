import React, { useCallback } from 'react';
import { getParty } from '../api/parties';

export default function useGetParty(partyId) {
  const [party, setParty] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const doGet = useCallback(async () => {
    try {
      setLoading(true);
      const party = await getParty(partyId);
      setParty(party);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [partyId]);

  React.useEffect(() => {
    doGet();
  }, [partyId, doGet]);

  return [{ party, error, loading }, doGet];
}
