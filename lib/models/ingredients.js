const fetch = require('node-fetch');
const { api_url, list } = require('./api');
const { getCollection } = require('../database');

const collectionName = 'ingredients';

async function getAllIngredients() {
  const ingredientsCollection = await getCollection(collectionName);
  const result = await ingredientsCollection.findOne();
  return result.ingredients;
}

async function setIngredientsDB() {
  const response = await fetch(`${api_url}${list}i=list`);
  const results = await response.json();

  const ingredients = results.drinks.map((ingredient) => {
    return ingredient.strIngredient1;
  });

  const ingredientsCollection = await getCollection(collectionName);
  const result = await ingredientsCollection.replaceOne(
    {},
    {
      ingredients: ingredients,
    },
    { upsert: true }
  );
  console.log('Ingredients were set!');
  return result;
}

exports.getAllIngredients = getAllIngredients;
exports.setIngredientsDB = setIngredientsDB;
