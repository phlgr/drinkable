const fetch = require('node-fetch');
const { api_url, list } = require('./api');
const { getCollection } = require('../database');

const collectionName = 'ingredients';

async function getAllIngredients() {
  const ingredientsCollection = await getCollection(collectionName);
  const result = await ingredientsCollection.find().toArray();
  return result;
}

async function setIngredientsDB() {
  const response = await fetch(`${api_url}${list}i=list`);
  const results = await response.json();

  const ingredientsCollection = await getCollection(collectionName);

  const existingIngredients = (
    await ingredientsCollection.find().toArray()
  ).map((ingredient) => ingredient.name);

  const ingredients = results.drinks
    .filter((drink) => !existingIngredients.includes(drink.strIngredient1))
    .map((drink) => {
      return {
        name: drink.strIngredient1,
        popularity: 0,
      };
    });
  if (ingredients.length === 0) {
    console.log('No new ingredients');
    return;
  }
  const result = await ingredientsCollection.insertMany(ingredients);
  console.log(`${ingredients.length} ingredients were set!`);
  return result;
}

async function filterIngredients(searchValue) {
  const lowerCaseSearchValue = searchValue.toLowerCase();
  const ingredients = await getAllIngredients();
  const filteredIngredients = ingredients.filter((ingredient) => {
    return ingredient.name.toLowerCase().includes(lowerCaseSearchValue);
  });
  return filteredIngredients;
}

exports.filterIngredients = filterIngredients;
exports.getAllIngredients = getAllIngredients;
exports.setIngredientsDB = setIngredientsDB;
