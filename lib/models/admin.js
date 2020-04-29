const fetch = require('node-fetch');
const { api_url, filter } = require('./api');
const { getCollection } = require('../database');
//const { convertToDrinkObject } = require('../models/drinks');

const collectionName = 'drinks';

async function getAllDrinks() {
  const responseNonAlcoholicDrinks = await fetch(
    `${api_url}${filter}a=Non_Alcoholic`
  );
  const nonAlcoholicDrinks = await responseNonAlcoholicDrinks.json();
  console.log(nonAlcoholicDrinks);
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

async function setDrinksDB() {
  const drinksCollection = await getCollection(collectionName);
  const allDrinks = await getAllDrinks();
  console.log(allDrinks);
  const result = await drinksCollection.insertMany(allDrinks);
  return result;
}

exports.setDrinksDB = setDrinksDB;
