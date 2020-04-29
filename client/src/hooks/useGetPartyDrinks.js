import React from 'react';
import { getPartyDrinks } from '../api/parties';

export default function useGetPartyDrinks(searchValue) {
  const [drinks, setDrinks] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  async function doGetPartyDrinks() {
    try {
      const filteredDrinks = await getPartyDrinks(searchValue);
      setDrinks(filteredDrinks);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    doGetPartyDrinks();
  }, [searchValue]);

  return [{ drinks, error, loading }];
}
