import React from 'react';
import { getPartyDrinks } from '../api/parties';

export default function useGetPartyDrinks(id, searchValue) {
  const [drinks, setDrinks] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function doGetPartyDrinks() {
      try {
        const filteredDrinks = await getPartyDrinks(id, searchValue);
        setDrinks(filteredDrinks);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    doGetPartyDrinks();
  }, [searchValue, id]);

  return [{ drinks, error, loading }];
}
