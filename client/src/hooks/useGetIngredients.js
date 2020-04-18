import React from 'react';
import { getIngredients } from '../api/ingredients';

import Ingredient from '../components/Ingredient';

export default function useGetIngredients() {
  const [ingredients, setIngredients] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  async function doGetIngredients() {
    try {
      const ingredients = await getIngredients();
      const ingredientSelectors = ingredients.map((ingredient) => (
        <Ingredient key={ingredient}>{ingredient}</Ingredient>
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
  }, []);

  return [{ ingredients, error, loading }, doGetIngredients];
}
