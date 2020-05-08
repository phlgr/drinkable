const fetch = require('node-fetch');
const { api_url, filter } = require('./api');
const { getCollection } = require('../database');
const { getDrinkDetails } = require('../models/drinks');
const { setIngredientsDB } = require('../models/ingredients');

const excludedIngredients = [
  'anise',
  'berries',
  'blackberries',
  'allspice',
  'asafoetida',
  'basil',
  'almond extract',
  'apricot',
  'bitters',
  'almond',
  'angelica root',
  'anis',
  'beef stock',
  'angostura bitters',
  'banana',
  'black pepper',
  'almond flavoring',
  'brown sugar',
  'chocolate ice-cream',
  'ice-cream',
  'lime peel',
  'cherries',
  'coriander',
  'cranberries',
  'fruit',
  'heavy cream',
  'kiwi',
  'lemon',
  'candy',
  'granulated sugar',
  'grapes',
  'lemon-lime',
  'cayenne pepper',
  'cucumber',
  'demerara sugar',
  'carbonated water',
  'glycerine',
  'green olives',
  'chocolate',
  'cornstarch',
  'egg',
  'eggnog',
  'fresh basil',
  'nutmeg',
  'peach',
  'blueberries',
  'celery salt',
  'egg white',
  'food coloring',
  'licorice root',
  'light cream',
  'olive oil',
  'onion',
  'club soda',
  'ground ginger',
  'butter',
  'cocoa powder',
  'mandarin',
  'cloves',
  'cream',
  'cumin powder',
  'hot sauce',
  'cherry',
  'cinnamon',
  'egg yolk',
  'dark soy sauce',
  'lime',
  'marshmallows',
  'pepper',
  'peychaud bitters',
  'ice',
  'kummel',
  'lemon peel',
  'mint',
  'carbonated soft drink',
  'dried oregano',
  'olive',
  'cardamom',
  'orange bitters',
  'powdered sugar',
  'raisins',
  'red chili flakes',
  'salt',
  'tabasco sauce',
  'tomato',
  'sugar',
  'habanero peppers',
  'lavender',
  'plain chocolate',
  'rock salt',
  'soda water',
  'water',
  'tea',
  'pineapple',
  'vanilla ice-cream',
  'chocolate sauce',
  'fresh mint',
  'rosemary',
  'vanilla',
  'red chile flakes',
  'red hot chili flakes',
  'vinegar',
  'strawberries',
  'salted chocolate',
];

const collectionName = 'drinks';

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

async function getDrinkIngredients(id) {
  const drinkIngredients = (await getDrinkDetails(id)).ingredients
    .filter(
      (ingredient) =>
        ingredient.name &&
        !excludedIngredients.includes(ingredient.name.toLowerCase())
    )
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
      };
    })
  );

  const result = await drinksCollection
    .insertMany(newDrinksWithIngredients)
    .then(await setIngredientsDB());
  console.log(`${newDrinksWithIngredients.length} drinks were set!`);

  return result;
}

exports.setDrinksDB = setDrinksDB;
