const fetch = require('node-fetch');
const { api_url, list } = require('./api');

async function getAllIngredients() {
  const response = await fetch(`${api_url}${list}i=list`);
  const results = await response.json();

  const ingredients = results.drinks.map((ingredient) => {
    return ingredient.strIngredient1;
  });
  return ingredients;
}

exports.getAllIngredients = getAllIngredients;
