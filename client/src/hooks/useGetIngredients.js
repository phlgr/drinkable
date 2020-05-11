import React from 'react';
import { getIngredients } from '../api/ingredients';

export default function useGetIngredients(searchValue) {
  const [ingredients, setIngredients] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function doGetIngredients() {
      try {
        const filteredIngredients = await getIngredients(searchValue);
        setIngredients(filteredIngredients);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    doGetIngredients();
  }, [searchValue]);

  return [{ ingredients, error, loading }];
}
