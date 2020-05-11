import React from 'react';
import { getDrinkDetails } from '../api/drinks';

export default function useGetDrinkDetails(id) {
  const [drinkDetails, setDrinkDetails] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function doGetDrinkDetails() {
      try {
        const drinkDetails = await getDrinkDetails(id);
        setDrinkDetails(drinkDetails);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    doGetDrinkDetails();
  }, [id]);

  return [{ drinkDetails, error, loading }];
}
