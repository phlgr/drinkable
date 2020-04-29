const fetch = require('node-fetch');

const { api_url, filter, lookup } = require('./api');

async function getDrinkList(ingredientsArray) {
  const ingredients = ingredientsArray.toString();

  const response = await fetch(`${api_url}${filter}i=${ingredients}`);
  const fullResult = await response.json();
  console.log(fullResult);
  const formattedResult = convertToDrinkObject(fullResult.drinks);

  return formattedResult;
}

const convertToDrinkObject = (data) =>
  data.reduce((acc, item) => {
    acc[item.strDrink.split('.').join('')] = {
      thumbnail: item.strDrinkThumb,
      id: item.idDrink,
    };
    return acc;
  }, {});

function trimWhitespace(value) {
  if (value === null) {
    return null;
  }
  return value.trim();
}

async function getDrinkDetails(id) {
  const response = await fetch(`${api_url}${lookup}i=${id}`);
  const resultsFull = await response.json();
  const drink = resultsFull.drinks[0];

  function writeIngredients(results) {
    let i = 1;
    let ingredients = [];

    for (i; i < 16; i++) {
      ingredients.push({
        name: results[`strIngredient${i}`],
        amount: trimWhitespace(results[`strMeasure${i}`]),
      });
    }
    return ingredients;
  }

  const details = {
    name: drink.strDrink,
    nameDE: drink.srtDrinkDE,
    image: drink.strDrinkThumb,
    type: drink.strAlcoholic,
    instructions: drink.strInstructions,
    instructionsDE: drink.strInstructionsDE,
    ingredients: writeIngredients(drink),
  };

  return details;
}

exports.getDrinkList = getDrinkList;
exports.convertToDrinkObject = convertToDrinkObject;
exports.getDrinkDetails = getDrinkDetails;
