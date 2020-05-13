const fetch = require('node-fetch');
const { api_url, filter } = require('./api');
const { getCollection } = require('../database');
const { getDrinkDetails } = require('../models/drinks');
const { setIngredientsDB } = require('../models/ingredients');

const collectionName = 'drinks';

async function setExcludedIngredients(excludedIngredientsArray) {
  console.log(excludedIngredientsArray);
  const excludedIngredients = excludedIngredientsArray.map((ingredient) => {
    return { name: ingredient };
  });
  const excludedIngredientsCollection = await getCollection(
    'excludedIngredients'
  );
  await excludedIngredientsCollection.drop();
  const response = await excludedIngredientsCollection.insertMany(
    excludedIngredients
  );
  return response;
}

async function getAllDrinksFromAPI() {
  const responseAlcoholicDrinks = await fetch(`${api_url}${filter}a=Alcoholic`);
  const alcoholicDrinks = await responseAlcoholicDrinks.json();
  const formattedAllDrinks = alcoholicDrinks.drinks.map((drink) => {
    return {
      name: drink.strDrink,
      thumbnail: drink.strDrinkThumb,
      id: drink.idDrink,
    };
  });
  return formattedAllDrinks;
}

async function getAllDrinks() {
  const drinksCollection = await getCollection(collectionName);
  const existingDrinks = (await drinksCollection.find().toArray()).map(
    (drink) => drink.name
  );
  return existingDrinks;
}

async function getDrinkIngredients(id, excludedIngredients) {
  const drinkIngredients = (await getDrinkDetails(id)).ingredients
    .filter(
      (ingredient) =>
        ingredient.name &&
        !excludedIngredients.includes(ingredient.name.toLowerCase())
    )
    .map((ingredient) => {
      return ingredient.name.toLowerCase();
    });

  return drinkIngredients;
}

async function setDrinksDB() {
  const drinksCollection = await getCollection(collectionName);
  const allDrinks = await getAllDrinksFromAPI();
  const existingDrinks = await getAllDrinks();

  const newDrinks = allDrinks
    .filter((drink) => !existingDrinks.includes(drink.name))
    .map((drink) => {
      return {
        name: drink.name,
        thumbnail: drink.thumbnail,
        id: drink.id,
      };
    });
  if (newDrinks.length === 0) {
    console.log('No new Drinks');
    await setIngredientsDB();
    return;
  }

  const excludedIngredientsCollection = await getCollection(
    'excludedIngredients'
  );
  const excludedIngredients = (
    await excludedIngredientsCollection.find().toArray()
  ).map((ingredient) => ingredient.name);
  console.log(excludedIngredients);
  const newDrinksWithIngredients = await Promise.all(
    newDrinks.map(async (drink) => {
      const ingredients = await getDrinkIngredients(
        drink.id,
        excludedIngredients
      );
      return {
        name: drink.name,
        thumbnail: drink.thumbnail,
        id: drink.id,
        ingredients: ingredients,
      };
    })
  );

  const result = await drinksCollection.insertMany(newDrinksWithIngredients);
  await setIngredientsDB();
  console.log(`${newDrinksWithIngredients.length} drinks were set!`);

  return result;
}

exports.setDrinksDB = setDrinksDB;
exports.setExcludedIngredients = setExcludedIngredients;
