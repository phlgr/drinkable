const fetch = require('node-fetch');
const { api_url, filter } = require('./api');
const { getCollection } = require('../database');
const { getDrinkDetails } = require('../models/drinks');

const collectionName = 'drinks';

async function getAllDrinksFromAPI() {
  const responseNonAlcoholicDrinks = await fetch(
    `${api_url}${filter}a=Non_Alcoholic`
  );
  const nonAlcoholicDrinks = await responseNonAlcoholicDrinks.json();
  const responseAlcoholicDrinks = await fetch(`${api_url}${filter}a=Alcoholic`);
  const alcoholicDrinks = await responseAlcoholicDrinks.json();

  const allDrinksArray = [
    ...nonAlcoholicDrinks.drinks,
    ...alcoholicDrinks.drinks,
  ];
  const formattedAllDrinks = allDrinksArray.map((drink) => {
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

async function getDrinkIngredients(id) {
  const drinkIngredients = (await getDrinkDetails(id)).ingredients
    .filter((ingredient) => ingredient.name !== null)
    .map((ingredient) => {
      return ingredient.name.toLowerCase();
    });

  console.log(drinkIngredients);
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
    return;
  }

  const newDrinksWithIngredients = await Promise.all(
    newDrinks.map(async (drink) => {
      const ingredients = await getDrinkIngredients(drink.id);
      return {
        name: drink.name,
        thumbnail: drink.thumbnail,
        id: drink.id,
        ingredients: ingredients,
        ingredientsLength: ingredients.length,
      };
    })
  );

  const result = await drinksCollection.insertMany(newDrinksWithIngredients);
  console.log(`${newDrinksWithIngredients.length} drinks were set!`);
  return result;
}

exports.setDrinksDB = setDrinksDB;
