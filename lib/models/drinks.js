const fetch = require('node-fetch');

const { api_url, filter, lookup } = require('./api');

async function getDrinkList(ingredientsArray) {
  const ingredients = ingredientsArray.toString();

  const response = await fetch(`${api_url}${filter}i=${ingredients}`);
  const drinks = await response.json();

  return drinks;
}

async function getDrinkDetails(id) {
  const response = await fetch(`${api_url}${lookup}i=${id}`);
  const resultsFull = await response.json();
  const results = resultsFull.drinks[0];

  function writeIngredients(results) {
    let i = 1;
    let ingredients = [];

    for (i; i < 16; i++) {
      ingredients.push(
        `${results[`strMeasure${i}`]}${results[`strIngredient${i}`]}`
      );
    }
    return ingredients;
  }

  const details = {
    name: results.strDrink,
    nameDE: results.srtDrinkDE,
    image: results.strDrinkThumb,
    type: results.strAlcoholic,
    instructions: results.strInstructions,
    instructionsDE: results.strInstructionsDE,
    ingredients: writeIngredients(results),
  };

  return details;
}

exports.getDrinkList = getDrinkList;
exports.getDrinkDetails = getDrinkDetails;
