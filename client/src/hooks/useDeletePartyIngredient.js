import React, { useCallback } from 'react';
import { deletePartyIngredient } from '../api/parties';

export default function useDeletePartyIngredient(partyId, ingredient) {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const doDelete = useCallback(async () => {
    try {
      setLoading(true);
      const response = await deletePartyIngredient(partyId, ingredient);
      setResponse(response);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [partyId, ingredient]);

  return [{ response, error, loading }, doDelete];
}
