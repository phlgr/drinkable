import React from 'react';
import { postParty } from '../api/parties';

export default function usePostParty() {
  const [partyId, setPartyId] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function doPost() {
    try {
      setLoading(true);
      const partyId = await postParty();
      setPartyId(partyId);
    } catch (error) {
      console.error.apply(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  return [{ partyId, error, loading }, doPost];
}
