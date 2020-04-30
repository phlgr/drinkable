const fetch = require('node-fetch');
const { getCollection } = require('../database');

const { api_url, lookup } = require('./api');

async function getDrinkList(ingredientsArray) {
  const ingredientsLowerCase = ingredientsArray.map((ingredient) =>
    ingredient.toLowerCase()
  );
  const drinksCollection = await getCollection('drinks');
  const filteredDrinks = await drinksCollection
    .find({
      ingredients: {
        $not: {
          $elemMatch: {
            $nin: ingredientsLowerCase,
          },
        },
      },
    })
    .toArray();

  const formattedFilteredDrinks = convertToDrinkObject(filteredDrinks);

  return formattedFilteredDrinks;
}

const convertToDrinkObject = (data) =>
  data.reduce((acc, item) => {
    acc[item.name.split('.').join('')] = {
      thumbnail: item.thumbnail,
      id: item.id,
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
exports.getDrinkDetails = getDrinkDetails;
