import React from 'react';
import { getParty } from '../api/parties';

export default function useGetParty(partyId) {
  const [party, setParty] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function doGet() {
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
  }

  React.useEffect(() => {
    doGet();
  }, [partyId]);

  return [{ party, error, loading }, doGet];
}
