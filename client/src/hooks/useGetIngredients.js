import React from 'react';
import { getIngredients } from '../api/ingredients';

import Ingredient from '../components/Ingredient';

export default function useGetIngredients(searchValue) {
  const [ingredients, setIngredients] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  async function doGetIngredients() {
    try {
      const ingredients = await getIngredients(searchValue);
      const ingredientSelectors = ingredients.map((ingredient) => (
        <Ingredient key={ingredient.name}>{ingredient.name}</Ingredient>
      ));
      setIngredients(ingredientSelectors);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    doGetIngredients();
  }, [searchValue]);

  return [{ ingredients, error, loading }];
}
